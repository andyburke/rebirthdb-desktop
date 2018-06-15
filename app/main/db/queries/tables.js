const { r } = require('rebirthdb-ts')

module.exports = {
  getTables,
  getTableStatus,
  getTablesStats
}

function getTables() {
  return r
    .db('rethinkdb')
    .table('table_config')
    .coerceTo('array')
}

function getTableStatus() {
  return r
    .db('rethinkdb')
    .table('table_status')
}

function getTablesStats() {
  return r
    .db('rethinkdb')
    .table('stats')
    .filter(row =>
      row('id')
        .nth(0)
        .eq('table_server')
    )
    .coerceTo('array')
}