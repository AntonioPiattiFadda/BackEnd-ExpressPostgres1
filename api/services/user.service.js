const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool')

// Ahora qeu implementamos sequelize no utilizamos mas getConection.
const getConnection = require('../libs/postgres');
// Vamos a usar sequelize. Sequelize cuando ejecuta la funcion setupModels crea un espacio reservado donde guarda todos los schemas que crea que se llama models
const { models } = require('../libs/sequelize')

class UserService {
  constructor() {
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    /* Eliminamos lo que usabamos antes
    const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query);
    return rta.rows;*/
    const rta = models.User.findAll({
      include: ['customer']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    // const user = await models.user.findByPk(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
   // Para mejorar el codigo en vez de buscar por le PK reutilizamos la funcion del constructor que es Find One y asi nos asegurmas de que si no encuentra tire el error correspondiente
   // const user = await models.user.findByPk(id);
    const user = await this.findOne(id);
    await user.destroy();
    return {
      id,
      message: 'El usuario fue eliminado correctamente'
      // El mensaje no me lo muestar en la rta. No se porque
    };
  }
}

module.exports = UserService;
