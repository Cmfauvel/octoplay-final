'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      code_cat: {
        type: Sequelize.STRING
      },
      name_cat: {
        type: Sequelize.STRING
      }
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    
      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Categories');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    
      Example:
      return queryInterface.dropTable('users');
    */
  }
};