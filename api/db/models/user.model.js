// Traemos algunas consas de sequielize
const { Model, DataTypes, Sequelize } = require ('sequelize');

//Primero le asignamos un nombre a nuestra tabla.
const USER_TABLE = 'users';

//Ahora vamos a definir el schema
const UserSchema =
  //Cada valor del cschema va a ser un objeto con diferentes atributos sobre el tipo de dato que vamoms a guardar en esa variable.
  {
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
    role: {
      allowNull:false,
      type:DataTypes.STRING,
      defaultValue:'customer'
    },
    createdAt:{
      allowNull:false,
      //  Acordate que en SQL no se usa camelCase sino un guon bajo para separar las palabras.
      type:DataTypes.DATE,field:'create_at',defaultValue:Sequelize.NOW
    }
  }

  //Ahora vamos a crear una clase que utilice nuestro esquema.
  class User extends Model{
    //Vamos a utilizar algunos metodos estaticos que quiere decir que no necesito declararlos para utilizarlos
    static associate(models){
      this.hasOne(models.Customer, {
        as:'customer',
        // COmo la relacion esta del lado del customer le tengo qe decir como la va a encontrar.
        foreignKey: 'userId'
      })
    }
    static config(sequelize){
      // Esta ultima parte la puedo repasar un poco porque no entendi bien que significa cada cosa.
      return{
        //Cual va a ser la coneccion que tendra.
        sequelize,
        tableName:USER_TABLE,
        modelName:'User',
        // timestamp es crear campos por defecto sobre todo en la creacion. POr ahora lo vamos a dejar asi.
        timestamps:false
      }
      }
  }
  module.exports={ USER_TABLE, UserSchema, User}
