import React, { Component } from 'react'
import * as requests from '../requests'
import Item from '../component/Item'

class Shop extends Component {
    state = {
        items: []
    }

    componentDidMount() {
        requests.getAllItems()
            .then(items => this.setState(() => ({ items })))
    }

    renderItems = (category) => {
        return this.state.items.filter(item => item.category === category).map(item => {
            return <Item key={item.id} {...item} clickHandler={this.buyItem} />
        })
    }

    buyItem = (item_id) => {
        if(this.props.money >= this.state.items.find(item => item.id === item_id).price) {
            const newInventory = { status_id: this.props.status_id, item_id }
            requests.buyItem(newInventory)
                .then(json => {
                    if(json && json.inventory) {
                        this.props.addToInventory(json.inventory)
                        this.props.updateMoney(json.money)
                    }
                })
        }
    }

    render() {
        return (
            <div className="shop">
                <h2 className="center">Tamagotchi Store</h2>
                <div className='food'>
                <h3 className="center">Food</h3>
                {this.renderItems('food')}
                </div>
                <div className='toys'>
                <h3 className="center">Toys</h3>
                {this.renderItems('toy')}
                </div>
            </div>
        )
    }
}

export default Shop