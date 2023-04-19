'use strict';

//Primero vamos a traer los modelos
const { ORDER_PRODUCT_TABLE, OrderProductSchema } = require ('../models/order-product.model')


module.exports = {
  up: async (queryInterface) => {
    // queryInterface nos da comandos de API.
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);

  },

    // La opcion down tiene que ver con las posibilidad de revertir cambios que hice
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE)
  }
};

