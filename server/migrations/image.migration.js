'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("Images", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      component: {
        type: Sequelize.STRING
      },

    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    
      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Images');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    
      Example:
      return queryInterface.dropTable('users');
    */
  }
};