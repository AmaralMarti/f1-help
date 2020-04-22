const { Model, DataTypes } = require('sequelize')

class Answers extends Model {
  static init(sequelize) {
    super.init({
      user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'answers',
      paranoid: true,
    })
  }

  static associate(models) {
    this.belongsTo(models.Questions, { foreignKey: 'questionId', as:'question' })
  }
}

module.exports = Answers
