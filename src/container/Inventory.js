import React from 'react'
import Item from '../component/Item'

const renderItems = (items) => {
    return items.map(inventory => {
        return <Item key={inventory.id} {...inventory.item} />
    })
}
function Inventory(props) {

    return (
        <div>
            <h1>Inventory</h1>
            <ul>
                {renderItems(props.items)}
            </ul>
        </div>
    )
}

export default Inventory