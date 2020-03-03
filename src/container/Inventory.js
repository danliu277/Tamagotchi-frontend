import React from 'react'
import Item from '../component/Item'
import * as requests from '../requests'


function Inventory(props) {

    const renderItems = (items, category) => {
        return items.filter(inventory => inventory.item.category === category).map(inventory => {
            return <Item key={inventory.id} {...inventory.item} quantity={inventory.quantity} clickHandler={sellItem} />
        })
    }



    const sellItem = (item_id) => {
        if (!props.disable) {
            const newInventory = { status_id: props.status_id, item_id }
            requests.sellItem(newInventory)
                .then(json => {
                    if (json && json.inventory) {
                        props.removeFromInventory(json.inventory)
                        props.updateMoney(json.money)
                    }
                })
        }
    }

    return (
        <div className="inventory scroll scroll3">
            <h3 className="center">INVENTORY</h3>
            {/* {renderItems(props.items)} */}
            <div className=''>
                <h4 className="center">Food</h4>
                {renderItems(props.items, 'food')}
            </div>
            <div>
                <h4 className="center">Toys</h4>
                {renderItems(props.items, 'toy')}
            </div>
        </div>
    )
}

export default Inventory