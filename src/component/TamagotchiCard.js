import React from 'react'

function TamagotchiCard(props) {
    return (
        <li>
            <div onClick={() => props.chooseTamagotchi(props.id)}>
                <h3>{props.name}</h3>
                <img src={props.image} alt={props.name} style={{width: '200px'}} />
            </div>
        </li>
    )
}

export default TamagotchiCard