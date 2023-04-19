'use strict';

//Primero vamos a traer los modelos
const { USER_TABLE, UserSchema } = require ('../models/user.model')


module.exports = {
  up: async (queryInterface) => {
    // queryInterface nos da comandos de API.
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

    // La opcion down tiene que ver con las posibilidad de revertir cambios que hice
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(USER_TABLE)
  }
};
