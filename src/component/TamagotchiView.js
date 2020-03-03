import React, { Component } from 'react'
import TamagotchiStatus from './TamagotchiStatus'
import * as requests from '../requests'

class TamagotchiView extends Component {
    state = {
        left: 50,
        interval: 0,
        eat: false,
        play: false
    }

    componentDidUpdate(prop) {
        if (this.props && !prop.status && this.props.status) {
            const intervalId = this.movement()
            this.setState(() => ({ interval: intervalId }))
        }
        if(this.props.status && prop.status && this.props.status.fullness <= 0 && prop.status.fullness > 0) {
            this.stopAnimaton()
        }
    }

    movement = () => {
        if (this.props.status.fullness > 0) {
            return setInterval(() => {
                this.setState(state => {
                    let position = state.left
                    if (position >= 80)
                        position -= 10
                    if (position <= 10)
                        position += 10
                    else {
                        let direction = Math.round(Math.random()) ? 1 : -1
                        position += (10 * direction)
                    }
                    return { left: position }
                })
            }, 3000)
        } else {
            return 0
        }
    }

    componentWillUnmount() {
        this.stopAnimaton()
    }

    stopAnimaton = () => {
        clearInterval(this.state.interval)
    }

    feedItem = (item_id) => {
        if (!this.props.disable) {
            requests.feedItem({ status_id: this.props.status.id, item_id })
                .then(json => {
                    if (json && json.inventory) {
                        this.props.removeFromInventory(json.inventory)
                        this.props.updateStatus('fullness', json.fullness)
                    }
                    this.toggleEat()
                    setTimeout(() => {
                        this.toggleEat()
                    }, 1500)
                })
        }
    }

    toggleEat = () => {
        this.setState(state => ({ eat: !state.eat }))
    }

    playItem = (item_id) => {
        if (!this.props.disable) {
            requests.playItem({ status_id: this.props.status.id, item_id })
                .then(json => {
                    if (json && json.inventory) {
                        this.props.removeFromInventory(json.inventory)
                        this.props.updateStatus('happiness', json.happiness)
                        this.props.updateMoney(json.money)
                    }
                    this.togglePlay()
                    setTimeout(() => {
                        this.togglePlay()
                    }, 1500)
                })
        }
    }

    togglePlay = () => {
        this.setState(state => ({ play: !state.play }))
    }

    renderTamagotchi = () => {
        if (this.props.status && this.props.status.fullness > 0) {
            return (
                <>
                    <div>
                        {this.state.play && <img
                            className="action"
                            src="https://media.giphy.com/media/4JXQArc0SQlh5diE9B/giphy.gif"
                            alt="heart" />}
                        {this.state.eat && <img className="action"
                            src="https://media.giphy.com/media/1xoZQOOU9gxStyVtab/giphy.gif"
                            alt="eat" />}
                    </div>
                    <img
                        className="tamagotchi"
                        src={this.props.tamagotchi && this.props.tamagotchi.image}
                        alt="tamagotchi"
                    />
                </>
            )
        } else {
            return (
                <img
                    className="tamagotchi"
                    src="https://media.giphy.com/media/mvkIAXfIVaYqhUDnrF/giphy.gif"
                    alt="tombstone" />
            )
        }
    }

    render() {
        return (
            <>
                <div
                    className="tamagotchi-wrapper"
                    style={{ left: `${this.state.left}%` }}>
                    {this.renderTamagotchi()}
                </div>
                <TamagotchiStatus
                    {...this.props.status}
                    inventory={this.props.inventory}
                    feedItem={this.feedItem}
                    playItem={this.playItem} />
            </>
        )
    }
}

export default TamagotchiView