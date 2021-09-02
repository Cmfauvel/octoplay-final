/** @format */

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("Image", {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING
        },
        size: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        path: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING
        },
        component: {
            type: DataTypes.STRING
        },
        // product_id: DataTypes.INTEGER
    }, {
        timestamps: false
      })
    return Image;
}