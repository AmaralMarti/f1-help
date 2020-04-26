const sequelize = require('../src/models/index')

const PopulateTable = async (model, data) => {
  const created = await model.create(data)
  return await model.findOne({where: { id: created.id }})
}

const dropAllTables = async () => {
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')

  await sequelize.query('DROP TABLE IF EXISTS answers;')
  await sequelize.query('DROP TABLE IF EXISTS questions;')

  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
}

const TruncateAllTables = async () => {
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')

  await sequelize.query(`TRUNCATE TABLE answers`)
  await sequelize.query(`TRUNCATE TABLE questions`)

  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
}

const BeforeAll = async () => {
  await dropAllTables()
  await sequelize.sync()
}

const AfterAll = async () => {
  await dropAllTables()
  await sequelize.close()
}

module.exports = {
  BeforeAll,
  AfterAll,
  TruncateAllTables,
  PopulateTable,
}
