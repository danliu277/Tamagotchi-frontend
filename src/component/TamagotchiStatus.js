import React from 'react'
import ItemStatus from './ItemStatus'
import { Link } from 'react-router-dom'

class TamagotchiStatus extends React.Component {
    state = {
        toy: [0, 1, 2],
        food: [0, 1, 2]
    }

    displayToys = () => {
        const array = []
        const toys = this.props.inventory.filter(inventory => inventory.item.category === 'toy')
        this.state.toy.forEach(index => {
            if (toys[index] && !array.includes(toys[index]))
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
            if (foods[index] && !array.includes(foods[index]))
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

    render() {
        return (
            <nav className="status-bar tamagotchi-status navbar-expand-lg navbar-light tamagotchi-navbar bottom-navbar">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className=''>
                        <ul className="navbar-nav mr-auto">
                            <div className='status-navbar' style={{ width: '150px' }}>
                                <div>
                                    Happiness: {this.props.happiness}
                                </div>
                                <div>
                                    Fullness: {this.props.fullness}
                                </div>
                            </div>
                        </ul>
                    </div>
                    <div>
                        <h3 className='neon' style={{ width: '150px' }}>
                            {this.props.nickname}
                        </h3>
                    </div>
                    <div className='food-toy-navbar'>
                        <button className="button-circle btn-4" onClick={this.handleLeftFood}>{'<<'}</button>
                        {
                            this.props.inventory.filter(inventory => inventory.item.category === 'food').length > 0 ?
                            this.displayFoods().map(inventory => <ItemStatus handleClick={this.props.feedItem} key={inventory.id} {...inventory.item} quantity={inventory.quantity} />) :
                            '🍟🍔🍙Feed Me🍉🍦🍩'
                        }
                        <button className="button-circle btn-4" onClick={this.handleRightFood}>{'>>'}</button>
                        <button className="button-circle btn-4" onClick={this.handleLeftToy}>{'<<'}</button>
                        {
                            this.props.inventory.filter(inventory => inventory.item.category === 'toy').length > 0 ?
                            this.displayToys().map(inventory => <ItemStatus handleClick={this.props.playItem} key={inventory.id} {...inventory.item} quantity={inventory.quantity} />) :
                            '🧸🚂🎮Play with Me⚽🏀🥊'
                        }
                        {/* {this.displayToys().map(inventory => <ItemStatus handleClick={this.props.playItem} key={inventory.id} {...inventory.item} quantity={inventory.quantity} />)} */}
                        <button className="button-circle btn-4" onClick={this.handleRightToy}>{'>>'}</button>
                    </div>
                        <h4>
                            <Link to={`/user/${this.props.user.id}/status/${this.props.id}/shop`}><img src='https://cdn4.iconfinder.com/data/icons/store-4/92/icon72-20-512.png' style={{width: '50px'}} alt="shop"/></Link>
                        </h4>
                        <h3 className='neon status-money-navbar'>

                            ${this.props.money}
                        </h3>
                </div>
            </nav>
        )

    }

}

export default TamagotchiStatus