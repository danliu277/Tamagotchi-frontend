import React, { Component } from 'react'
import * as requests from '../requests'
import { Route, Switch } from 'react-router-dom'
import TamagotchiStatus from '../component/TamagotchiStatus'
import TamagotchiView from '../component/TamagotchiView'
import NavBar from './NavBar'
import ShopContainer from './ShopContainer'

class MainContainer extends Component {
    state = {
        status: null,
        inventory: []
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user)
            this.getStatus()
    }

    getStatus = () => {
        requests.getStatus(this.props.match.params.id)
            .then(status => {
                this.setState(() => ({ status }), () => {
                    this.getInventory()
                })
            })
    }

    getInventory = () => {
        requests.getInventory(this.state.status.id)
            .then(inventory => this.setState(() => ({ inventory })))
    }

    updateBuyInventory = (inventory) => {
        this.setState(state => {
            const stateInventory = state.inventory.find(inv => inv.id === inventory.id)
            if(stateInventory) {
                return {
                    inventory: state.inventory.map(inv => {
                        if(inv.id === inventory.id)
                            return inventory
                        else
                            return inv
                    })
                }
            } else {
                return { inventory: [...state.inventory, inventory]}
            }
        })
    }

    updateMoney = (money) => {
        this.setState(state => {
            return { status: {...state.status, money}}
        })
    }

    updateSellInventory = (inventory) => {
        this.setState(state => {
            const stateInventory = state.inventory.find(inv => inv.id === inventory.id)
            // debugger
            if(stateInventory && inventory.quantity > 0) {
                return {
                    inventory: state.inventory.map(inv => {
                        if(inv.id === inventory.id)
                            return inventory
                        else
                            return inv
                    })
                }
            } else if(stateInventory && inventory.quantity === 0){
                return {
                    inventory: state.inventory.filter(inv => {
                        return inv.id !== inventory.id
                    })
                }
            }
        })
    }

    render() {
        return (
            <div className={this.props.location.pathname.includes('shop') ? 'shop-background' : 'tamagotchi-background'}>
                <NavBar path={this.props.match.url} pathname={this.props.location.pathname} {...this.state.status} />
                <Switch>
                    <Route exact path={`${this.props.match.path}/shop`} render={() =>
                        <ShopContainer 
                            items={this.state.inventory} 
                            status_id={this.state.status && this.state.status.id} 
                            updateBuyInventory={this.updateBuyInventory}
                            updateSellInventory={this.updateSellInventory}
                            updateMoney={this.updateMoney} />
                    } />
                    <Route path="">
                        <TamagotchiView />
                        <TamagotchiStatus {...this.state.status} />
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default MainContainer