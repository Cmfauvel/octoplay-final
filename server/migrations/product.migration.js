'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      fabrication: {
        type: Sequelize.STRING
      },
      utilisation: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.FLOAT
      },
      // category: {
      //   type: Sequelize.INTEGER,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Categories',
      //     key: 'code_cat'
      //   }
      // }
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    
      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Products');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    
      Example:
      return queryInterface.dropTable('users');
    */
  }
};