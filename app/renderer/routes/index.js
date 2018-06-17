import React, { Component } from 'react'
import ErrorBoundary from 'react-error-boundary'
import Error from '../components/Error'
import { Switch, Route } from 'react-router'
import Home from '../views/Home'
import NewConnection from '../views/Connection/NewConnection'
import EditConnection from '../views/Connection/EditConnection'
import Dashboard from '../views/Dashboard'
import Tables from '../views/Tables'
import Servers from '../views/Servers'
import Explorer from '../views/Explorer'
import Logs from '../views/Logs'

class Routes extends Component {
  newConnection = () => {
    return <NewConnection onConnected={this.props.onConnected}/>
  }

  render() {
    return <ErrorBoundary FallbackComponent={Error}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/newConnection"
          component={this.newConnection}
        />
        <Route exact path="/editConnection/:id" component={EditConnection} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/tables" component={Tables} />
        <Route exact path="/servers" component={Servers} />
        <Route exact path="/explorer" component={Explorer} />
        <Route exact path="/logs" component={Logs} />
      </Switch>
    </ErrorBoundary>
  }
}
export default Routes
