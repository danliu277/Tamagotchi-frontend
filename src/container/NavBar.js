import React from 'react'
import { Link } from 'react-router-dom'

function NavBar(props) {
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
                            {
                                props.statuses.map(status =>
                                    <a href={`/status/${status.id}`} key={status.id} >
                                        {status.nickname}
                                    </a>
                                )
                            }
                        </div>
                    </div>

                </ul>
                <div className="form-inline my-2 my-lg-0">
                    ${props.money}
                </div>
            </div>
        </nav>
    )
}

export default NavBar