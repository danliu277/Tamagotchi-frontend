import React, { Component } from 'react';

class UserForm extends Component {
    state = {
        username: '',
        password: ''
    }

    updateUser = (event) => {
        const { name, value } = event.target
        this.setState(() => ({ [name]: value }))
    }

    login = (event) => {
        event.preventDefault()
        this.props.login(this.state)
    }

    createUser = (event) => {
        event.preventDefault()
        this.props.createUser(this.state)
    }

    render() {
        return (
            <form className='login-card'>
                <label>Username</label>
                <input name="username" value={this.state.username} onChange={this.updateUser} />
                <br/>
                <label>Password</label>
                <input name="password" type='password' value={this.state.password} onChange={this.updateUser} />
                <br/>
                <button className='login-button' onClick={this.login}>Login</button>
                <button className='login-button' onClick={this.createUser}>Create User</button>
            </form>
        );
    }
}

export default UserForm;
