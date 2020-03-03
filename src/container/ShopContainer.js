import React from 'react'
import Inventory from './Inventory'
import Shop from './Shop'
import { Link } from 'react-router-dom'

function ShopContainer(props) {
    return (
        <div>
            <div>
                <Link to={`/user/${props.userId}/status/${props.status_id}`}>Home</Link>
                <h3>${props.money}</h3>
            </div>
            <div className="shop-container">
                <Shop
                    status_id={props.status_id}
                    money={props.money}
                    addToInventory={props.addToInventory}
                    updateMoney={props.updateMoney}
                    disable={props.disable} />
                <Inventory
                    items={props.items}
                    status_id={props.status_id}
                    removeFromInventory={props.removeFromInventory}
                    updateMoney={props.updateMoney}
                    disable={props.disable}
                />
            </div>
        </div>
    )
}

export default ShopContainer