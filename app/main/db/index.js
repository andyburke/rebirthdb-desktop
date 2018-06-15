const { connect, getServersInfo, getTablesInfo, getLogs } = require('./driver')
const ipc = require('electron-better-ipc')
const url = require('../helpers/url')

const queries = {
  servers: getServersInfo,
  tables: getTablesInfo,
  logs: getLogs
}

ipc.answerRenderer('connect', ({ name, address }) => {
  const { host, port } = url.extract(address)
  return connect({ host, port })
})

Object.keys(queries).forEach(name => {
  const action = queries[name]
  ipc.answerRenderer(name, () => {
    try {
      return action(arguments)
    } catch (e) {
      console.error(name, e)
      throw e
    }
  })
})
