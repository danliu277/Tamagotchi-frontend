import React from 'react'

function TamagotchiStatus(props) {
    return (


        

        <nav className="status-bar tamagotchi-status navbar-expand-lg navbar-light tamagotchi-navbar bottom-navbar">
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button> */}
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
                <div className='food item-space'>
                    <i className="arrow left"/>
                    {props.inventory.filter(inventory => inventory.item.category === 'food').map(inventory => <img src={inventory.item.image} style={{ height: '40px' }} />)}
                    {/* {props.inventory.filter(inventory => inventory.item.category === 'food').map(inventory => inventory.quantity)} */}
                    <i className="arrow right"/>
                </div>
                <div className='toy'>
                    <i className="arrow left"/>
                    {props.inventory.filter(inventory => inventory.item.category === 'toy').map(inventory => <img src={inventory.item.image} style={{ height: '40px' }} />)}
                    <i className="arrow right"/>
                </div>
                </div>
                {/* <div className="form-inline my-2 my-lg-0">
                    ${props.money}
                </div> */}
            </div>
        </nav>
















        // <div className="tamagotchi-status">
        //     <div>
        //         <p>Happiness: {props.happiness}</p>
        //     </div>
        //     <div>
        //         <p>Fullness: {props.fullness}</p>
        //     </div>
        //     <div>
        // {props.inventory.map(inventory => inventory.item.name)}
        //     {/* <img src={props.inventory.item.image} style={{width: '50px'}}/> */}
        //     </div>
        // </div>
    )
}

export default TamagotchiStatus