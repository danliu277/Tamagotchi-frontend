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

    renderItems = () => {
        return this.state.items.map(item => {
            return <Item key={item.id} {...item} clickHandler={this.buyItem} />
        })
    }

    buyItem = (item_id) => {
        if(this.props.money >= this.state.items.find(item => item.id === item_id).price) {
            const newInventory = { status_id: this.props.status_id, item_id }
            requests.buyItem(newInventory)
                .then(json => {
                    this.props.updateBuyInventory(json.inventory)
                    this.props.updateMoney(json.money)
                })
        }
    }

    render() {
        return (
            <div className="shop">
                <h1>Shop</h1>
                <ul>
                    {this.renderItems()}
                </ul>
            </div>
        )
    }
}

export default Shop