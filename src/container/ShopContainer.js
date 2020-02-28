import React from 'react'
import Inventory from './Inventory'
import Shop from './Shop'

function ShopContainer(props) {
    return (
        <div>
            <Shop status_id={props.status_id} updateBuyInventory={props.updateBuyInventory} updateMoney={props.updateMoney} />
            <Inventory items={props.items} status_id={props.status_id} updateSellInventory={props.updateSellInventory} updateMoney={props.updateMoney} />
        </div>
    )
}

export default ShopContainer