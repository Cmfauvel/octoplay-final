'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      society_name: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      num: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      additionnal_information: {
        type: Sequelize.STRING
      },
      zip_code: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      // user_id: {
      //   type: Sequelize.UUID,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Users',
      //     key: 'id'
      //   }
      // },
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Addresses');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};