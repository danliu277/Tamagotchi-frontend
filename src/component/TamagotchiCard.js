import React, { Component } from 'react'

class TamagotchiCard extends Component {
    state = {
        input: ''
    }

    updateInput = (input) => {
        this.setState(() => ({input}))
    }

    chooseTamagotchi = (event) => {
        event.preventDefault()
        this.props.chooseTamagotchi(this.props.id, this.state.input)
    }

    render() {
        return (
            <div>
                <h3>{this.props.name}</h3>
                <img src={this.props.image} alt={this.props.name} style={{width: '200px'}} />
                <form onSubmit={this.chooseTamagotchi}>
                    <input type="string" placeholder="Nickname" value={this.state.input} onChange={event => this.updateInput(event.target.value)} />
                    <input type="submit" value="Adopt" />
                </form>
            </div>
        )
    }
}

export default TamagotchiCard