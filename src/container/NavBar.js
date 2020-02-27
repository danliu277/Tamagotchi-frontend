import React from 'react'
import { Link } from 'react-router-dom'

function NavBar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light tamagotchi-navbar">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {
                    props.pathname.includes('shop') ? 
                    <li className="nav-item">
                        <Link to={props.path} className="navbar-brand">Home</Link>
                    </li> :
                    <li className="nav-item">
                        <Link to={`${props.path}/shop`} className="navbar-brand">Shop</Link>
                    </li>}
                    <li className="nav-item">
                        <a className="navbar-brand">Feed</a>
                    </li>
                    <li className="nav-item">
                        <a className="navbar-brand">Play</a>
                    </li>
                    {/* <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </li> */}
                </ul>
                <div className="form-inline my-2 my-lg-0">
                    ${props.money}
                </div>
            </div>
        </nav>
    )
}

export default NavBar