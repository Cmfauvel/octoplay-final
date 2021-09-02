/** @format */

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    society_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    additionnal_information: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    num: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    // user_id: {
    //   type: DataTypes.UUID
    // },
  },
    {
    }, { timestamps: false, underscored: true });
  return Address;
};
