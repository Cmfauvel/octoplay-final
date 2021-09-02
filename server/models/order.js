/** @format */

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      price: {
        type: DataTypes.FLOAT
      },
      total_price: {
        type: DataTypes.FLOAT
      },
      delivry_cost: {
        type: DataTypes.FLOAT
      },
      status: {
        type: DataTypes.ENUM("waiting", "in-delivering", "achieved"),
      },
      address_id: {
         allowNull: true,
        type: DataTypes.UUID
      },
      user_id: {
        type: DataTypes.UUID
      }
    },
    { timestamps: true, underscored: true } //par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique pour les dates de création et de modification (très pratique si nécessaire) et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId".
  );

  return Order;
};
