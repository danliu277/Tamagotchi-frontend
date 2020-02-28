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
        const newInventory = { status_id: this.props.status_id, item_id }
        requests.buyItem(newInventory)
            .then(inventory => this.props.updateBuyInventory(inventory))
    }

    render() {
        return (
            <div>
                <h1>Shop</h1>
                <ul>
                    {this.renderItems()}
                </ul>
            </div>
        )
    }
}

export default Shop