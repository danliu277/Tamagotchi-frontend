import React from 'react'
import { Link } from 'react-router-dom'
import * as requests from '../requests'

function NavBar(props) {
    const feedItem = (item_id) => {
        requests.feedItem({ status_id: props.id, item_id})
            .then(json => {
                if(json && json.inventory) {
                    props.removeFromInventory(json.inventory)
                    props.updateStatus('fullness', json.fullness)
                }
            })
    }

    const playItem = (item_id) => {
        requests.playItem({ status_id: props.id, item_id})
            .then(json => {
                if(json && json.inventory) {
                    props.removeFromInventory(json.inventory)
                    props.updateStatus('happiness', json.happiness)
                    props.updateMoney(json.money)
                }
            })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light tamagotchi-navbar sticky">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                    <div className="dropdown">
                        <button className="dropbtn">
                            {
                                props.pathname.includes('shop') ?
                                    <Link to={props.path} className="dropbtn">Home</Link>
                                    :
                                    <Link to={`${props.path}/shop`} className="dropbtn">Shop</Link>
                            }
                        </button>
                    </div>

                    <div className="dropdown">
                        <button className="dropbtn">Feed</button>
                        <div className="dropdown-content">
                            {
                                props.inventory.filter(inventory => inventory.item.category === 'food')
                                    .map(inventory =>
                                        <a href="#" key={inventory.id} onClick={() => feedItem(inventory.item.id)}> 
                                            {inventory.item.name.charAt(0).toUpperCase() + inventory.item.name.slice(1)} x{inventory.quantity}
                                            {/* <img src={inventory.item.image} style={{width: '50px'}}/> */}
                                        </a>
                                    )
                            }
                        </div>
                    </div>

                    <div className="dropdown">
                        <button className="dropbtn">Play</button>
                        <div className="dropdown-content">
                            {
                                props.inventory.filter(inventory => inventory.item.category === 'toy')
                                    .map(inventory => 
                                        <a href="#" key={inventory.id} onClick={() => playItem(inventory.item.id)}> 
                                            {inventory.item.name.charAt(0).toUpperCase() + inventory.item.name.slice(1)} x{inventory.quantity}
                                        </a>
                                    )
                            }
                        </div>
                    </div>

                </ul>
                <div className="form-inline my-2 my-lg-0">
                    ${props.money}
                </div>
            </div>
        </nav>
    )
}

export default NavBar