const { r } = require('rebirthdb-ts')

module.exports = {
  getLogs
}

function getLogs() {
  return r
    .db('rethinkdb')
    .table('logs')
    .coerceTo('array')
}
