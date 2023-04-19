const { serialize } = require('pg-protocol');
const {Model, DataTypes, Sequelize } = require('sequelize');

const MARCAS_TABLE = 'Marcas'

const MarcasSchema = {
  id:{
    allowNull:false,
    autoIncrement:true,
    primaryKey:true,
    type:DataTypes.INTEGER
  },
  email:{
    allowNull:false,
    type:DataTypes.STRING,
    unique:true,
  },
  password:{
    allowNull:false,
    type:DataTypes.STRING
  },
  createdAt:{
    allowNull:false,
    type:DataTypes.DATE,field:'create_at',defaultValue:Sequelize.NOW
  }
}

class Marcas extends Model {
  static associate(){

  }
  static config (sequelize){
    return{
      sequelize,
      tableName:MARCAS_TABLE,
      modelName:'Marcas',
      timestamps:false
    }
  }
}

module.exports = {MARCAS_TABLE, Marcas, MarcasSchema }
