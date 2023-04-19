'use strict';
const {CategoriesSchema, CATEGORIES_TABLE} = require ('../models/categories.model')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(CATEGORIES_TABLE, 'created-at', 'created_at');

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
