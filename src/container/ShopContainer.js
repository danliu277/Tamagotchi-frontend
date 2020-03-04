import React from 'react'
import Inventory from './Inventory'
import Shop from './Shop'
import { Link } from 'react-router-dom'

function ShopContainer(props) {
    return (
        <div>
            <div className='shop-home-navbar center'>
                <Link to={`/user/${props.userId}/status/${props.status_id}`}><img className='center-image' src='https://www.stickpng.com/assets/images/588a668cd06f6719692a2d1b.png' style={{ width: '50px'}} alt="home"></img></Link>
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