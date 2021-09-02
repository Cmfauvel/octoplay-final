'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      price: {
        type: Sequelize.FLOAT
      },
      // userId: {
      //   allowNull: false,
      //   type: Sequelize.UUID,
      //   defaultValue: Sequelize.UUIDV4,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'User',
      //     key: 'id'
      //   }
      // },
      status: {
        type: Sequelize.ENUM("waiting", "in-delievering", "achieved"),
        allowNull: false,
        defaultValue: "waiting"
      },
      // address: {
      //   type: Sequelize.UUID,
      //   allowNull: true,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Address',
      //     key: 'id'
      //   }
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
 
      Example:
      return queryInterface.createTable('Orders', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Orders');

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
 
      Example:
      return queryInterface.dropTable('users');
    */
  }
};