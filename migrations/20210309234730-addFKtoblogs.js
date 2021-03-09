'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('blogs', {
        fields: ['authorID'],
        type: 'FOREIGN KEY',
        name: 'addFKtoblogs',
        references: {
          table: 'users',
          field: 'id'
        }
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('blogs', 'addFKtoblogs')
    ])
  }
}
