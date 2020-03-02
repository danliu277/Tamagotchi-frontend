import React from 'react'
import * as requests from '../requests'

class TamagotchiStatus extends React.Component {
    state = {
        toy: [0, 1, 2],
        food: [0, 1, 2]
    }

    displayToys = () => {
        const array = []
        const toys = this.props.inventory.filter(inventory => inventory.item.category === 'toy')
        this.state.toy.forEach(index => {
            if (toys[index])
                array.push(toys[index])
        })
        return array
    }

    handleRightToy = () => {
        this.setState(state => {
            const toy = state.toy
            const toys = this.props.inventory.filter(inventory => inventory.item.category === 'toy')
            return { toy: toy.map(index => index === toys.length - 1 ? 0 : index + 1) }
        })
    }

    handleLeftToy = () => {
        this.setState(state => {
            const toy = state.toy
            const toys = this.props.inventory.filter(inventory => inventory.item.category === 'toy')
            return { toy: toy.map(index => index === 0 ? toys.length - 1 : index - 1) }
        })
    }

    displayFoods = () => {
        const array = []
        const foods = this.props.inventory.filter(inventory => inventory.item.category === 'food')
        this.state.food.forEach(index => {
            if (foods[index])
                array.push(foods[index])
        })
        return array
    }

    handleRightFood = () => {
        this.setState(state => {
            const food = state.food
            const foods = this.props.inventory.filter(inventory => inventory.item.category === 'food')
            return { food: food.map(index => index === foods.length - 1 ? 0 : index + 1) }
        })
    }

    handleLeftFood = () => {
        this.setState(state => {
            const food = state.food
            const foods = this.props.inventory.filter(inventory => inventory.item.category === 'food')
            return { food: food.map(index => index === 0 ? foods.length - 1 : index - 1) }
        })
    }

    feedItem = (item_id) => {
        requests.feedItem({ status_id: this.props.id, item_id})
            .then(json => {
                if(json && json.inventory) {
                    this.props.removeFromInventory(json.inventory)
                    this.props.updateStatus('fullness', json.fullness)
                }
            })
    }

    playItem = (item_id) => {
        requests.playItem({ status_id: this.props.id, item_id})
            .then(json => {
                if(json && json.inventory) {
                    this.props.removeFromInventory(json.inventory)
                    this.props.updateStatus('happiness', json.happiness)
                    this.props.updateMoney(json.money)
                }
            })
    }

    render() {
        return (
            <nav className="status-bar tamagotchi-status navbar-expand-lg navbar-light tamagotchi-navbar bottom-navbar">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className=''>
                        <ul className="navbar-nav mr-auto">
                            <div className='status-navbar'>
                                <div>
                                    Happiness: {this.props.happiness}
                                </div>
                                <div>
                                    Fullness: {this.props.fullness}
                                </div>
                            </div>
                        </ul>
                    </div>
                    <div className='food-toy-navbar'>
                        <button className="btn-4" onClick={this.handleLeftFood}>{'<<'}</button>
                            {this.displayFoods().map(inventory => <img key={inventory.id} onClick={() => this.feedItem(inventory.item.id)} src={inventory.item.image} style={{ height: '40px' }} />)}
                        <button className="btn-4" onClick={this.handleRightFood}>{'>>'}</button>

                        <button className="btn-4" onClick={this.handleLeftToy}>{'<<'}</button>
                        {this.displayToys().map(inventory => <img key={inventory.id} onClick={() => this.playItem(inventory.item.id)} src={inventory.item.image} style={{ height: '40px' }} />)}
                        <button className="btn-4" onClick={this.handleRightToy}>{'>>'}</button>
                    </div>
                </div>
            </nav>
        )

    }

}

export default TamagotchiStatus