import React from 'react'

function TamagotchiStatus(props) {
    return (
        <div className="tamagotchi-status">
            <div>
                <p>Happiness: {props.happiness}</p>
            </div>
            <div>
                <p>Fullness: {props.fullness}</p>
            </div>
        </div>
    )
}

export default TamagotchiStatus