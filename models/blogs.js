'use strict'
module.exports = (sequelize, DataTypes) => {
  const blogs = sequelize.define('blogs', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    author: DataTypes.STRING,
    authorID: DataTypes.INTEGER
  }, {})
  blogs.associate = function (models) {
    blogs.belongsTo(models.users, {
      as: 'users',
      foreignKey: 'id'
    })
  }
  return blogs
}
