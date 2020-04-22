const { Model, DataTypes } = require('sequelize')

class Questions extends Model {
  static init(sequelize) {
    super.init({
      user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'questions',
      paranoid: true,
    })
  }

  static associate(models) {
    this.hasMany(models.Answers, { foreignKey: 'questionId', as: 'answers' })
  }
}

module.exports = Questions
