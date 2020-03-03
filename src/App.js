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

  createUser = (user) => {
    requests.createUser(user)
      .then(resp => {
        if (resp.errors) {
          alert(resp.errors)
        } else {
          this.setState(() => ({ user: resp.user }), () => {
            this.getStatuses()
          })
        }
      })
  }

  login = (user) => {
    requests.loginUser(user)
      .then(resp => {
        if (resp.error) {
          alert(resp.errors)
        } else {
          this.setState(() => ({ user: resp.user }), () => {
            if (this.state.user)
              this.getStatuses()
          })
        }
      })
  }

  getStatuses = () => {
    requests.getUserStatuses(this.state.user.id)
      .then(statuses => {
        this.setState(() => ({ statuses }), () => {
          if (this.state.statuses && this.state.statuses.length > 0) {
            this.props.history.push(`/status/${this.state.statuses[0].id}`)
          } else {
            this.props.history.push('/tamagotchis')
          }
        })
      })
  }

  logout = () => {
    this.setState(() => ({user: null}))
    this.props.history.push('/user')
  }

  render() {
    return (
      <>
        <Switch>
          <Route path='/user'>
            <UserForm createUser={this.createUser} login={this.login} />
          </Route>
          <Route path='/tamagotchis' render={(routerProps) => {
            if (!this.state.user)
              return <Redirect to="/user" />
            return <PickTamagotchi user={this.state.user} {...routerProps} getStatuses={this.getStatuses} />
          }} />
          <Route path='/status/:id' render={(routerProps) => {
            if (!this.state.user)
              return <Redirect to="/user" />
            return <MainContainer user={this.state.user} {...routerProps} statuses={this.state.statuses} logout={this.logout} />
          }} />
          <Route render={() => <h1>These are not the routes you are looking for...</h1>} />
        </Switch>
      </>
    )
  }
}

export default App;
