const { r } = require('rebirthdb-ts')
const { getServers, getServerStatus, getServersStats } = require('./queries/servers')
const { getTables, getTableStatus, getTablesStats } = require('./queries/tables')
const { getLogs } = require('./queries/logs')

let connection

const driver = {
  getConnection() {
    return connection
  },
  async getServersInfo() {
    const [list, status, stats] = await Promise.all([
      getServers().run(connection),
      getServerStatus().run(connection),
      getServersStats().run(connection)
    ]);

    return {
      list,
      status,
      stats
    }
  },
  async getTablesInfo() {
    const [list, status, stats] = await Promise.all([
      getTables().run(connection),
      getTableStatus().run(connection),
      getTablesStats().run(connection)
    ]);

    return {
      list,
      status,
      stats
    }
  },
  getLogs () {
    return getLogs().run(connection)
  },
  connect: async function(config = {}) {
    if (connection) {
      console.info('there is an active connection - closing current connection')
      await driver.disconnect()
      console.info('closed')
    }
    console.info('new connection request')
    connection = await r.connect(config)
    console.info('connected')
    return connection
  },
  async disconnect() {
    if (connection && connection.close) {
      return connection.close()
    }
  }
}

module.exports = driver
