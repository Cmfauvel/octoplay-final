/** @format */

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            // defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        utilisation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fabrication: {
            type: DataTypes.STRING,
            allowNull: true
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, { timestamps: false, underscored: true })
    return Product;
}