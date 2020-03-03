import React, { Component } from 'react'
import * as requests from '../requests'
import { Route, Switch } from 'react-router-dom'
import TamagotchiView from '../component/TamagotchiView'
import NavBar from './NavBar'
import ShopContainer from './ShopContainer'
import Graveyard from '../component/Graveyard'

class MainContainer extends Component {
    state = {
        status: null,
        inventory: [],
        tamagotchi: null,
        interval: 0
    }

    componentDidMount() {
        clearInterval(this.state.interval)
        this.getStatus(this.props.match.params.id)
        this.unlisten = this.props.history.listen(location => {
            if (location.pathname.includes('status'))
                this.getStatus(location.pathname.split('/')[2])
        });
    }

    getStatus = (id) => {
        requests.getStatus(id)
            .then(status => {
                this.setState(() => ({ status }), () => {
                    this.getInventory()
                    this.getTamagotchi()
                })
            })
    }

    statusInterval = () => {
        const interval = setInterval(() => {
            requests.getStatus(this.props.match.params.id)
                .then(status => {
                    this.setState(() => ({ status }))
                })
        }, 50000)
        this.setState(() => ({ interval }))
    }

    componentWillUnmount() {
        this.unlisten()
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

    background = () => {
        if (this.props.location.pathname.includes('shop'))
            return 'shop-background'
        else if (this.props.location.pathname.includes('graveyard'))
            return 'graveyard-background'
        else
            return 'tamagotchi-background'
    }

    render() {
        return (
            <div className={this.background()}>
                <NavBar
                    path={this.props.match.url}
                    pathname={this.props.location.pathname}
                    history={this.props.history}
                    {...this.state.status}
                    inventory={this.state.inventory}
                    statuses={this.props.statuses}
                    logout={this.props.logout}
                />
                <Switch>
                    <Route exact path={`${this.props.match.path}/shop`} render={() =>
                        <ShopContainer
                            items={this.state.inventory}
                            status_id={this.state.status && this.state.status.id}
                            money={this.state.status && this.state.status.money}
                            addToInventory={this.addToInventory}
                            removeFromInventory={this.removeFromInventory}
                            updateMoney={this.updateMoney}
                            disable={this.state.status && this.state.status.fullness <= 0} />
                    } />
                    <Route path={`${this.props.match.path}/graveyard`}>
                        <Graveyard
                            tamagotchis={this.props.statuses && this.props.statuses.filter(status => status.fullness <= 0)} />
                    </Route>
                    <Route path="">
                        <TamagotchiView
                            status={this.state.status}
                            inventory={this.state.inventory}
                            tamagotchi={this.state.tamagotchi}
                            removeFromInventory={this.removeFromInventory}
                            updateStatus={this.updateStatus}
                            updateMoney={this.updateMoney}
                            disable={this.state.status && this.state.status.fullness <= 0} />
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default MainContainer