import React, { Component } from 'react'
import * as requests from '../requests'
import TamagotchiCard from '../component/TamagotchiCard'

class PickTamagotchi extends Component {
    state = {
        tamagotchis: []
    }

    componentDidMount() {
        requests.getAllTamagotchis()
            .then((tamagotchis) => {
                this.setState(() => ({ tamagotchis }))
            })
    }

    renderTamagotchi = () => {
        return this.state.tamagotchis.map(tamagotchi => {
            return <TamagotchiCard key={tamagotchi.id} {...tamagotchi} chooseTamagotchi={this.chooseTamagotchi} />
        })
    }

    chooseTamagotchi = (tamagotchi_id, nickname) => {
        requests.chooseTamagotchi({user_id: this.props.user.id, tamagotchi_id, nickname })
            .then((status) => this.props.history.push(`/status/${status.id}`))
    }

    render() {
        return (
            <div>
                <h1>Choose Your Tamagotchi</h1>
                { this.renderTamagotchi() }
            </div>
        )
    }
}

export default PickTamagotchi