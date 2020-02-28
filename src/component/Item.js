import React from 'react'

function Item(props) {
    return (
        <li>
            <div onClick={() => props.clickHandler(props.id)}>
                <h3>{props.name && props.name.charAt(0).toUpperCase() + props.name.slice(1)} {props.quantity ? `X${props.quantity}` : `$${props.price}`}</h3>
                <img src={props.image} alt={props.name} style={{ width: '100px' }} />
            </div>
        </li>
    )
}

export default Item