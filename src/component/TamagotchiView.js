import React, { Component } from 'react'
import TamagotchiStatus from './TamagotchiStatus'

class TamagotchiView extends Component {
    state = {
        left: 50,
        interval: 0
    }

    componentDidMount() {
        const intervalId = this.movement()
        this.setState((state) => ({ interval: intervalId }))
    }

    movement = () => {
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
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    render() {
        return (
            <>
                <div
                    className="tamagotchi-wrapper"
                    style={{ left: `${this.state.left}%` }}>
                    <div>
                        {/* <img
                            className="action"
                            src="https://media.giphy.com/media/4JXQArc0SQlh5diE9B/giphy.gif" /> */}
                            <img className="action"
                                src="https://media.giphy.com/media/1xoZQOOU9gxStyVtab/giphy.gif" />
                    </div>
                    <img
                        className="tamagotchi"
                        src={this.props.tamagotchi && this.props.tamagotchi.image}
                    />
                </div>
                <TamagotchiStatus 
                    {...this.props.status} 
                    inventory={this.props.inventory}
                    removeFromInventory={this.props.removeFromInventory}
                    updateStatus={this.props.updateStatus}
                    updateMoney={this.props.updateMoney}  />
            </>
        )
    }
}

export default TamagotchiView