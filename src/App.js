import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import * as requests from './requests'
import UserForm from './component/UserForm';
import MainContainer from './container/MainContainer';

class App extends Component {
  state = {
    user: null,
    statuses: [],
    interval: 0
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
            const status = this.state.statuses.find(status => status.fullness > 0)
            const statusId = status ? status.id : this.state.status[0].id
            this.props.history.push(`/user/${this.state.user.id}/status/${statusId}`)
            this.statusInterval()
          } else {
            this.props.history.push(`/user/${this.state.user.id}/tamagotchis`)
          }
        })
      })
  }

  getStatusesNoReroute = () => {
    requests.getUserStatuses(this.state.user.id)
      .then(statuses => {
        this.setState(() => ({ statuses }))
      })
  }

  logout = () => {
    this.setState(() => ({ user: null }))
    this.props.history.push('/user')
  }

  statusInterval = () => {
    const interval = setInterval(() => {
      requests.getUserStatuses(this.state.user.id)
        .then(statuses => {
          this.setState(() => ({ statuses }))
        })
    }, 50000)
    this.setState(() => ({ interval }))
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path='/user'>
            <UserForm createUser={this.createUser} login={this.login} />
          </Route>
          <Route path='/user/:user_id' render={(routerProps) => {
            if (!this.state.user)
              return <Redirect to="/user" />
            return <MainContainer user={this.state.user} {...routerProps} statuses={this.state.statuses} logout={this.logout} getStatuses={this.getStatusesNoReroute} />
          }} />
          <Route render={() => <Redirect to="/user" />} />
        </Switch>
      </>
    )
  }
}

export default App;
