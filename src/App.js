import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import * as requests from './requests'
import UserForm from './component/UserForm';
import PickTamagotchi from './container/PickTamagotchi';
import MainContainer from './container/MainContainer';

class App extends Component {
  state = {
    user: null,
    statuses: []
  }

  componentDidMount() {
    this.loginUser()
  }

  createUser = (user) => {
    requests.createUser(user)
      .then(user => this.setState(() => ({ user }), () => {
        this.getStatuses()
      }))
  }

  login = (user) => {
    requests.loginUser(user)
      .then(user => this.setState(() => ({ user }), () => this.getStatuses()))
  }

  getStatuses = () => {
    requests.getUserStatuses(this.state.user.id)
      .then(statuses => this.setState(() => ({ statuses })))
  }

  toggleLogin = () => {
    this.setState(currentState => ({ login: !currentState.login }))
  }

  render() {
    return (
      <>
        <Switch>
          <Route path='/tamagotchis' render={(routerProps) =>
            <PickTamagotchi user={this.state.user} {...routerProps} getStatuses={this.getStatuses} />
          } />
          <Route path='/user'>
            <UserForm createUser={this.createUser} login={this.login} />
          </Route>
          <Route path='/status/:id' render={(routerProps) =>
            <MainContainer user={this.state.user} {...routerProps} statuses={this.state.statuses} />
          } />
          <Route render={() => <h1>These are not the routes you are looking for...</h1>} /> 
        </Switch>
      </>
    )
  }
}

export default App;
