const faker = require('faker');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('../libs/sequelize');
const pool = require('../libs/postgres.pool');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
    //Coneccion con pool
    this.pool = pool;
    this.pool.on('error', (error) => console.error(error));
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    // const options = {
    //   include: ['category'],
    //   where: {},
    // };
    // const { limit, offset } = query;
    // if (limit && offset) {
    //   (options.limit = limit), (options.offset = offset);
    // }
    // const { price } = query;
    // if (price) {
    //   //Ver bien porque pongo 2 prices.
    //   options.where.price = price;
    // }
    // const { price_min, price_max } = query;
    // if (price_min && price_max) {
    //   options.where.price = {
    //     [Op.gte]: price_min,
    //     [Op.lte]: price_max,
    //   };
    // }

    // const products = models.Product.findAll(options);
    // return products;

    const query = 'SELECT * FROM products';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    let asdf = id;
    const product = await models.Product.findByPk();
    return product;
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
