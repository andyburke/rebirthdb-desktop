const { r } = require('rebirthdb-ts')

module.exports = {
  getServers,
  getServerStatus,
  getServersStats
}

function getServers() {
  return r
    .db('rethinkdb')
    .table('server_config')
    .coerceTo('array')
}

function getServerStatus() {
  return r
    .db('rethinkdb')
    .table('server_status')
}

function getServersStats() {
  return r
    .db('rethinkdb')
    .table('stats')
    .filter(row =>
      row('id')
        .nth(0)
        .eq('server')
    )
    .coerceTo('array')
}