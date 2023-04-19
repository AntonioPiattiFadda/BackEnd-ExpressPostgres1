'use strict';

//Primero vamos a traer los modelos
const { ORDER_TABLE, OrderSchema } = require ('../models/order.model')


module.exports = {
  up: async (queryInterface) => {
    // queryInterface nos da comandos de API.
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);

  },

    // La opcion down tiene que ver con las posibilidad de revertir cambios que hice
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(ORDER_TABLE)
  }
};
