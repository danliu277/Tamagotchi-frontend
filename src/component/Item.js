import React from 'react'

function Item(props) {
    return (
        <div className="item-card" onClick={() => props.clickHandler(props.id)}>
            {props.name && props.name.charAt(0).toUpperCase() + props.name.slice(1)} {props.quantity ? `x${props.quantity}` : `$${props.price}`}
            <img className='center-image' src={props.image} alt={props.name} style={{ width: '70px', height: '70px' }} />
        </div>
    )
}



export default Item