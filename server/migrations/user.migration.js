'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        mail: {
          type: Sequelize.STRING,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        confirmationCode: {
          type: Sequelize.STRING,
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM("pending", "active", "inactive"),
          allowNull: false,
          defaultValue: "pending"
        },
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
        return queryInterface.createTable('users', { id: Sequelize.INTEGER });
      */
    },
  
    down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('Users');
  
      /*
        Add reverting commands here.
        Return a promise to correctly handle asynchronicity.
  
        Example:
        return queryInterface.dropTable('users');
      */
    }
  };