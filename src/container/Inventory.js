import React from 'react'
import Item from '../component/Item'
import * as requests from '../requests'


function Inventory(props) {

    const renderItems = (items) => {
        return items.map(inventory => {
            return <Item key={inventory.id} {...inventory.item} quantity={inventory.quantity} clickHandler={sellItem} />
        })
    }

    const sellItem = (item_id) => {
        const newInventory = { status_id: props.status_id, item_id }
        requests.sellItem(newInventory)
            .then(json => {
                props.updateSellInventory(json.inventory)
                props.updateMoney(json.money)
            })
    }

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