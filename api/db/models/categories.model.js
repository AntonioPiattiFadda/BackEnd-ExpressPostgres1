const {Model , DataTypes, Sequelize} = require('sequelize');

const CATEGORIES_TABLE = 'Categories';

const CategoriesSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type:DataTypes.INTEGER
  } ,
  name: {
    allowNull: false,
    type:DataTypes.STRING,
    //Desde aca agregue asique lo tengo que migrar.
    unique: true,
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
}

class Categories extends Model {
  static associate(models){
   this.hasMany(models.Product, {
      as: 'products',
      // Necesitamos una Key para que lo rastree por loq ue le ponemos el atributo de nuestro modelo de products
      foreignKey: 'categoryId'
    });
  }
  static config (sequelize){
    return{
      //Cual va a ser la coneccion que tendra.
      sequelize,
      tableName:CATEGORIES_TABLE,
      modelName:'Categories',
      // timestamp es crear campos por defecto sobre todo en la creacion. POr ahora lo vamos a dejar asi.
      timestamps:false
    }
  }

}

module.exports = {CATEGORIES_TABLE, CategoriesSchema, Categories};
