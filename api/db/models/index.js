// Este archivo seria como un router de modelos.

const{ User, UserSchema } = require('./user.model');
const{ Categories , CategoriesSchema } = require('./categories.model');
const{ Marcas , MarcasSchema } = require('./marcas.model');
const{ Customer , CustomerSchema } = require('./customer.model');
const{ Product , ProductSchema } = require('./products.model');
const{ Order , OrderSchema } = require('./order.model');
const{ OrderProduct , OrderProductSchema } = require('./order-product.model');

function setupModels(sequelize){
  //Primero le voy a decir al schema User que inicie con el schema UserSchema
      // Luego de eso le paso la config.
  User.init(UserSchema, User.config(sequelize));
  Categories.init(CategoriesSchema, Categories.config(sequelize))
  Marcas.init(MarcasSchema, Marcas.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))
  Product.init(ProductSchema, Product.config(sequelize))
  Order.init(OrderSchema, Order.config(sequelize))
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize))


    //De esta forma le enviamos los modelos a las tablas. No entendi bien porque pero bueno
    User.associate(sequelize.models)
    Customer.associate(sequelize.models)
    Categories.associate(sequelize.models)
    Product.associate(sequelize.models)
    Order.associate(sequelize.models)
    OrderProduct.associate(sequelize.models)

}
// Ya tenemos nuestro setup model asique ahora vamos al archuivo sequelize y lo corremos.

module.exports = setupModels;


