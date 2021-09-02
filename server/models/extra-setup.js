/** @format */

function applyExtraSetup(sequelize) {
  // import all models at once from index
  const { User, Address, Product, Category, Order, Item, Image, Role } =
    sequelize.models;

  // user has many addresses

  User.hasMany(Address, { as: "addresses", foreignKey: "UserId", onDelete: "CASCADE", hooks: true });

  // user has many orders

  User.hasMany(Order, { as: "commandes", foreignKey: "user_id", onDelete: "CASCADE", hooks: true });
  Order.belongsTo(User, { as: "user", foreignKey: "user_id"});
  // Order.hasOne(User, { as: "user"})

  Role.hasMany(User, { as: "users",  foreignKey: "role_id", onDelete: "CASCADE", hooks: true });

  // category has many products

  // Category.hasMany(Product, {
  //   onDelete: "CASCADE",
  //   hooks: true,
  // });
  Category.hasMany(Product, {as: "produits", onDelete: "CASCADE", hooks: true });

  // product has many images

  Product.hasMany(Image, { as: "images", onDelete: "CASCADE", hooks: true });
  // Image.belongsTo(Product);

  // product has many order items

  // Product.hasMany(Item, {
  //   targetKey: "name",
  //   onDelete: "CASCADE",
  //   hooks: true,
  // });
  Item.belongsTo(Product);

  // order has many order items

  Order.hasMany(Item, { as: "items", onDelete: "CASCADE", hooks: true });
  // Item.belongsTo(Order);

  // Address.hasMany(Order, {as: "commandes", foreignKey: "address_id", hooks: true })
  Order.belongsTo(Address, { as: "address", foreignKey: "address_id"});

  // Image.hasMany(OrderItem, {
  //   targetKey: "path",
  //   onDelete: "CASCADE",
  //   hooks: true,
  // });
  // Item.belongsTo(Image);
  
}

module.exports = { applyExtraSetup };
