/** @format */

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            // defaultValue: DataTypes.UUIDV4,
        },
        code_cat: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        name_cat: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },
        {
            timestamps: false
        })
    return Category;
}