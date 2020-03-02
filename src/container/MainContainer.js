import React, { Component } from 'react'
import * as requests from '../requests'
import { Route, Switch } from 'react-router-dom'
import TamagotchiView from '../component/TamagotchiView'
import NavBar from './NavBar'
import ShopContainer from './ShopContainer'

class MainContainer extends Component {
    state = {
        status: null,
        inventory: [],
        tamagotchi: null,
        interval: 0
    }

    componentDidMount() {
        this.getStatus()
    }

    getStatus = () => {
        requests.getStatus(this.props.match.params.id)
            .then(status => {
                this.setState(() => ({ status }), () => {
                    this.getInventory()
                    this.getTamagotchi()
                })
            })
        const interval = setInterval(() => {
            requests.getStatus(this.props.match.params.id)
                .then(status => {
                    this.setState(() => ({ status }))
                })
        }, 60000)
        this.setState(() => ({ interval }))
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    getInventory = () => {
        requests.getInventory(this.state.status.id)
            .then(inventory => this.setState(() => ({ inventory })))
    }

    getTamagotchi = () => {
        requests.getTamagotchi(this.state.status.tamagotchi_id)
            .then(tamagotchi => this.setState(() => ({ tamagotchi })))
    }

    addToInventory = (inventory) => {
        this.setState(state => {
            const stateInventory = state.inventory.find(inv => inv.id === inventory.id)
            if (stateInventory) {
                return {
                    inventory: state.inventory.map(inv => {
                        if (inv.id === inventory.id)
                            return inventory
                        else
                            return inv
                    })
                }
            } else {
                return { inventory: [...state.inventory, inventory] }
            }
        })
    }

    updateMoney = (money) => {
        this.setState(state => {
            return { status: { ...state.status, money } }
        })
    }

    updateStatus = (name, value) => {
        this.setState(state => {
            return { status: { ...state.status, [name]: value } }
        })
    }

    removeFromInventory = (inventory) => {
        this.setState(state => {
            const stateInventory = state.inventory.find(inv => inv.id === inventory.id)
            if (stateInventory && inventory.quantity > 0) {
                return {
                    inventory: state.inventory.map(inv => {
                        if (inv.id === inventory.id)
                            return inventory
                        else
                            return inv
                    })
                }
            } else if (stateInventory && inventory.quantity === 0) {
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
                <NavBar
                    path={this.props.match.url}
                    pathname={this.props.location.pathname}
                    history={this.props.history}
                    {...this.state.status}
                    inventory={this.state.inventory}
                    statuses={this.props.statuses}
                    />
                <Switch>
                    <Route exact path={`${this.props.match.path}/shop`} render={() =>
                        <ShopContainer
                            items={this.state.inventory}
                            status_id={this.state.status && this.state.status.id}
                            money={this.state.status && this.state.status.money}
                            addToInventory={this.addToInventory}
                            removeFromInventory={this.removeFromInventory}
                            updateMoney={this.updateMoney} />
                    } />
                    <Route path="">
                        <TamagotchiView 
                            status={this.state.status} 
                            inventory={this.state.inventory} 
                            tamagotchi={this.state.tamagotchi}
                            removeFromInventory={this.removeFromInventory}
                            updateStatus={this.updateStatus}
                            updateMoney={this.updateMoney}  />
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default MainContainer