'use strict';

//Primero vamos a traer los modelos
const { USER_TABLE, UserSchema } = require ('../models/user.model')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Le indico 1ero que tabla quiero qu emodifique, despues como se va a llamar el campo y despues que esquema tengo que utilizar para ccrear esa columna.
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
