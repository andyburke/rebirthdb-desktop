import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from 'react-router'
import Routes from './routes'
import { ServersProvider } from './contexts/servers'
import { TablesProvider } from './contexts/tables'
import { LogsProvider } from './contexts/logs'
import createHashHistory from 'history/createHashHistory'

import './components/Icon/icons'
import './style/app.js'

const history = createHashHistory()

class App extends Component {
  state = {
    tables: {
      list: []
    },
    servers: {
      list: []
    },
    logs: []
  }

  componentDidMount() {}

  onConnected = connection => {
    this.registerForStats(connection)
  }

  registerForStats(connection) {
    if (this.statsFetchInterval) {
      clearInterval(this.statsFetchInterval)
    }

    this.statsFetchInterval = setInterval(async () => {
      const [servers, tables, logs] = await Promise.all([
        connection.getServers(),
        connection.getTables(),
        connection.getLogs()
      ])

      this.setState({ servers, tables, logs })
    }, 2000)
  }

  render() {
    const { servers, tables, logs } = this.state
    return (
      <ServersProvider value={servers}>
        <TablesProvider value={tables}>
          <LogsProvider value={logs}>
            <Router history={history}>
              <Routes onConnected={this.onConnected} />
            </Router>
          </LogsProvider>
        </TablesProvider>
      </ServersProvider>
    )
  }
}

export default hot(module)(App)
