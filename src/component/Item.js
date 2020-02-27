import React from 'react'

function Item(props) {
    return (
        <li>
            <h3>{props.name}</h3>
            <img src={props.image} alt={props.name} style={{width: '100px'}}/>
        </li>
    )
}

export default Item