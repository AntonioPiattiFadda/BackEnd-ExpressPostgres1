const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');

class ProductsService {
  constructor() {
    this.products = [];
    this.pool = pool;
    this.pool.on('error', (error) => console.error(error));
  }

  async create(data) {
    const query =
      'INSERT INTO products (name, price, description, image, category_id, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *';
    const rta = await this.pool.query(query, [
      data.name,
      data.price,
      data.description,
      data.image,
      data.categoryId,
    ]);
    return rta.rows[0];
  }

  async find() {
    // Agregar el query para ver si le pongo limit y offset o price min y max
    const query = 'SELECT * FROM products';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const rta = await this.pool.query(query, [id]);
    const product = rta.rows[0];
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    let columns = '';
    let values = [];
    // Se recorre el objeto de cambios para construir la cadena de actualización
    // y los valores que se van a pasar a la consulta
    Object.keys(changes).forEach((key, index) => {
      columns += `${key} = $${index + 1}, `;
      values.push(changes[key]);
    });
    // Se quita la última coma y espacio que sobran de la cadena de actualización
    columns = columns.slice(0, -2);
    // Se agrega el ID del producto a actualizar al final del array de valores
    values.push(id);
    const query = `UPDATE products SET ${columns} WHERE id = $${values.length} RETURNING *`;
    const rta = await this.pool.query(query, values);
    if (rta.rowCount === 0) {
      throw boom.notFound('product not found');
    }
    return rta.rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
    const rta = await this.pool.query(query, [id]);
    if (rta.rowCount === 0) {
      throw boom.notFound('product not found');
    }
    return rta.rows[0];
  }

}

module.exports = ProductsService;
