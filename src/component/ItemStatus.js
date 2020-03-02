import React from 'react'

function ItemStatus(props) {


  return (
    <figure className="snip1356 green" onClick={() => props.handleClick(props.id)}>
      <img src={props.image} style={{ height: '40px' }} alt={props.name} />
      <div className="image">
        <img src={props.image} style={{ height: '40px' }} alt={props.name} />
      </div>
      <figcaption>
        x{props.quantity}
      </figcaption>
    </figure>

  )

}

export default ItemStatus