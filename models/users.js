'use strict'
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {})
  users.associate = function (models) {
    users.hasMany(models.blogs, {
      as: 'blogs',
      foreignKey: 'id'
    })
  }
  return users
}
