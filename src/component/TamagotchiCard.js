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
        if(this.state.input) {
            this.props.chooseTamagotchi(this.props.id, this.state.input)
        }
    }

    render() {
        return (
            <div className='tamagotchi-card'>
                <h3>{this.props.name}</h3>
                <img className='center-image' src={this.props.image} alt={this.props.name} style={{width: '150px'}} />
                <form onSubmit={this.chooseTamagotchi}>
                    <input type='text' placeholder="Nickname" value={this.state.input} onChange={event => this.updateInput(event.target.value)} />
                    <input className='button' type="submit" value="(｡♥‿♥｡)"/>
                </form>
            </div>
        )
    }
}

export default TamagotchiCard