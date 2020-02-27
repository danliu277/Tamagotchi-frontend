import React from 'react'
import Inventory from './Inventory'
import Shop from './Shop'

function ShopContainer(props) {
    return (
        <div>
            <Shop />
            <Inventory items={props.items} />
        </div>
    )
}

export default ShopContainer