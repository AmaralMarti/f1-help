const env = process.env.NODE_ENV || 'prod'

const dialect = process.env.DB_DIALECT || 'mariadb'
const host = process.env.DB_HOST || 'localhost'
const username = process.env.DB_USER || 'root'
const password = process.env.DB_PASS || '1234'
const database = `f1_help_db_${env}`
const port = process.env.DB_PORT || 3306

module.exports = {
    dialect,
    host,
    username,
    password,
    database,
    port,
    define: {
      timestamps: true,
    },
    dialectOptions: {
      timezone:'Etc/GMT0',
    },
}
