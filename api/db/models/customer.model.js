const{Model,DataTypes,Sequelize}=require('sequelize');

const{USER_TABLE}=require('./user.model')

const CUSTOMER_TABLE='customers';

const CustomerSchema={
  id:{
    allowNull:false,
    autoIncrement:true,
    primaryKey:true,
    type:DataTypes.INTEGER
  },
  name:{
    allowNull:false,
    type:DataTypes.STRING,
  },
  lastName:{
    allowNull:false,
    type:DataTypes.STRING,
    field:'last_name',
  },
  phone:{
    allowNull:true,
    type:DataTypes.STRING,
  },
  createdAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue:Sequelize.NOW,
  },
  //Crreamos este campo para la relacion con la tabla users.
  userId:{
    field:'user_id',
    allowNull:false,
    type:DataTypes.INTEGER,
    unique:true,
    references:{
      model:USER_TABLE,
      key:'id'
    },
    onUpdate:'CASCADE',
    onDelete:'SET NULL'
  }
}

class Customer extends Model{
  //Le pponemos como parametro models y ya veremos como lo mandamos.
  static associate(models){
    // Le decimos con que tabla se va a relacionar y le ponemos un alias que seria el as user.
    this.belongsTo(models.User,{as:'user'});
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId'
    })
  }
  static config(sequelize){
    return{
      sequelize,
      tableName:CUSTOMER_TABLE,
      modelName:'Customer',
      timestamps:false
    }
  }
}

module.exports= { Customer,CustomerSchema,CUSTOMER_TABLE };
