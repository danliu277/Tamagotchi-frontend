import React from 'react'

function Item(props) {
    return (
        <div className="" onClick={() => props.clickHandler(props.id)}>
            <h3>{props.name && props.name.charAt(0).toUpperCase() + props.name.slice(1)} {props.quantity ? `x${props.quantity}` : `$${props.price}`}</h3>
            <img src={props.image} alt={props.name} style={{ width: '100px' }} />
        </div>
    )
}

export default Item