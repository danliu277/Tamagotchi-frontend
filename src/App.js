import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import * as requests from './requests'
import UserForm from './component/UserForm';
import PickTamagotchi from './container/PickTamagotchi';
import MainContainer from './container/MainContainer';

class App extends Component {
  state = {
    login: true,
    user: null
  }

  componentDidMount() {
    this.loginUser()
  }

  createUser = (user) => {
    requests.createUser(user)
      .then(user => console.log(user))
  }

  loginUser = (user) => {
    console.log("login")
    requests.loginUser(user)
      .then(user => this.setState(() => ({ user })))
  }

  toggleLogin = () => {
    this.setState(currentState => ({ login: !currentState.login }))
  }

  renderForm = () => {
    if (this.state.login)
      return <UserForm submitHandler={this.loginUser} login={this.state.login} />
    else
      return <UserForm submitHandler={this.createUser} login={this.state.login} />
  }

  render() {
    return (
      <>
        <Switch>
          <Route path='/tamagotchis' render={(routerProps) =>
            <PickTamagotchi user={this.state.user} {...routerProps} />
          } />
          <Route path='/user'>
            <button onClick={this.toggleLogin}>{this.state.login ? 'Create User' : 'Login'}</button>
            {this.renderForm()}
          </Route>
          <Route path='/status/:id' render={(routerProps) =>
            <MainContainer user={this.state.user} {...routerProps} />
          } />
        </Switch>
      </>
    )
  }
}

export default App;
