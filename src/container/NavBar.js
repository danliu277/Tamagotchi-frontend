import React from 'react'
import { Link } from 'react-router-dom'

function NavBar(props) {
    const adoptRoute = () => {
        props.history.push(`/user/${props.userId}/tamagotchis`)
    }

    const graveyardRoute = () => {
        props.history.push(`${props.path}/graveyard`)
    }

    const renderTamagotchiDropdown = () => {
        const array = props.statuses.filter(status => status.fullness > 0).map(status =>
            <Link to={`/user/${props.userId}/status/${status.id}`} key={status.id} >
                {status.nickname}
            </Link>
        )
        return array
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light tamagotchi-navbar sticky">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                    <div className="dropdown">
                        <button className="dropbtn">
                            {
                                props.pathname.includes('shop') ?
                                    <Link to={props.path} className="dropbtn">Home</Link>
                                    :
                                    <Link to={`${props.path}/shop`} className="dropbtn">Shop</Link>
                            }
                        </button>
                    </div>

                    <div className="dropdown">
                        <button className="dropbtn">Tamagotchis</button>
                        <div className="dropdown-content">
                            {renderTamagotchiDropdown()}
                        </div>
                    </div>

                    <div className="dropdown">
                        <button className="dropbtn" onClick={() => adoptRoute()}>Adopt Tamagotchis</button>
                    </div>

                    <div className="dropdown">
                        <button className="dropbtn" onClick={() => graveyardRoute()}>
                            Graveyard
                            <span role='img' aria-label={props.label ? props.label : ""}>☠️</span>
                        </button>
                    </div>

                    <div className="dropdown">
                        <button className="dropbtn" onClick={props.logout}>Logout</button>
                    </div>

                </ul>
                <div className="form-inline my-2 my-lg-0">
                    <h3 className='neon'>${props.money}</h3>
                </div>
            </div>
        </nav>
    )
}

export default NavBar