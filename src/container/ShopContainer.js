import React from 'react'
import Inventory from './Inventory'
import Shop from './Shop'

function ShopContainer(props) {
    return (
        <div className="shop-container">
            <Shop 
                status_id={props.status_id} 
                money={props.money} 
                addToInventory={props.addToInventory} 
                updateMoney={props.updateMoney} 
                disable={props.disable}/>
            <Inventory 
                items={props.items} 
                status_id={props.status_id} 
                removeFromInventory={props.removeFromInventory} 
                updateMoney={props.updateMoney} 
                disable={props.disable}
                />
        </div>
    )
}

export default ShopContainer