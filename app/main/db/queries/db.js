const { r } = require('rebirthdb-ts')

module.exports = {
  getDBs
}

function getDBs() {
  return r
    .db('rethinkdb')
    .table('db_config')
    .coerceTo('array')
}