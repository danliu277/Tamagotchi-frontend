import React from 'react'

function TamagotchiStatus(props) {
    return (
        <nav className="status-bar tamagotchi-status navbar-expand-lg navbar-light tamagotchi-navbar bottom-navbar">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className=''>

                    <ul className="navbar-nav mr-auto">
                        <div className='status-navbar'>
                            <div>
                                Happiness: {props.happiness}
                            </div>
                            <div>
                                Fullness: {props.fullness}
                            </div>
                        </div>
                    </ul>
                </div>
                <div className='food-toy-navbar'>
                    <button className="btn-4">{'<<'}</button>
                    {props.inventory.filter(inventory => inventory.item.category === 'food').map(inventory => <img key={inventory.id} src={inventory.item.image} style={{ height: '40px' }} />)}

                    <button className="btn-4">{'>>'}</button>
                    <button className="btn-4">{'<<'}</button>
                    {props.inventory.filter(inventory => inventory.item.category === 'toy').map(inventory => <img key={inventory.id} src={inventory.item.image} style={{ height: '40px' }} />)}
                    <button className="btn-4">{'>>'}</button>
                </div>
            </div>
        </nav>
    )
}

export default TamagotchiStatus