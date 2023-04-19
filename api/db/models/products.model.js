const {Model , DataTypes, Sequelize} = require('sequelize');

const { CATEGORIES_TABLE } = require ('./categories.model')

const PRODUCT_TABLE = 'Products';

const ProductSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type:DataTypes.INTEGER
  } ,
  name: {
    allowNull: false,
    type:DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type:DataTypes.TEXT,
  },
  price: {
    allowNull: false,
    type:DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  categoryId:{
    field:'category_id',
    allowNull:false,
    type:DataTypes.INTEGER,
    references:{
      model:CATEGORIES_TABLE,
      key:'id'
    },
    onUpdate:'CASCADE',
    onDelete:'SET NULL'
  }
}

class Product extends Model {
  static associate(models){
    this.belongsTo(models.Categories,{
      as: 'category'
    })
  }
  static config (sequelize){
    return{
      //Cual va a ser la coneccion que tendra.
      sequelize,
      tableName:PRODUCT_TABLE,
      modelName:'Product',
      // timestamp es crear campos por defecto sobre todo en la creacion. POr ahora lo vamos a dejar asi.
      timestamps:false
    }
  }

}

module.exports = {PRODUCT_TABLE, ProductSchema, Product};
