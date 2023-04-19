'use strict';

const {ProductSchema, PRODUCT_TABLE} = require ('../models/products.model')
const {CategoriesSchema, CATEGORIES_TABLE} = require ('../models/categories.model')
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema)
    await queryInterface.changeColumn(CATEGORIES_TABLE, 'name', {
      allowNull: false,
      type:DataTypes.STRING,
      unique: true,
    })
    await queryInterface.addColumn(CATEGORIES_TABLE, 'image', {
      type: DataTypes.STRING,
      allowNull: false,
    })
    await queryInterface.addColumn(CATEGORIES_TABLE, 'createdAt', {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(PRODUCT_TABLE)
  }
};
