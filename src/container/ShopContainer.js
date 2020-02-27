import React from 'react'
import Inventory from './Inventory'
import Shop from './Shop'

function ShopContainer() {
    return (
        <div>
            <h1>Shop</h1>
            <Shop />
            <Inventory />
        </div>
    )
}

export default ShopContainer