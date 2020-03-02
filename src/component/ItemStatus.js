import React from 'react'

function ItemStatus(props) {


  return (
    <figure class="snip1356 green">
      <img src={props.image} style={{ height: '40px' }} />
      <div class="image">
        <img src={props.image} style={{ height: '40px' }} />
      </div>
      <figcaption>
        x{props.quantity}
      </figcaption>
    </figure>

  )

}

export default ItemStatus