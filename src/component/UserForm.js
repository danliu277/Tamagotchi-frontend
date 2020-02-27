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

    submitHandler = (event) => {
        event.preventDefault()
        this.props.submitHandler(this.state)
    }


    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <label>Username</label>
                <input name="username" value={this.state.username} onChange={this.updateUser} />
                <label>Password</label>
                <input name="password" value={this.state.password} onChange={this.updateUser} />
                <button>{this.props.login ? 'Login' : 'Create User'}</button>
            </form>
        );
    }
}

export default UserForm;
