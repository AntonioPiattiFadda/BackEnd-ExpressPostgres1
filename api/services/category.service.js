const boom = require('@hapi/boom');

// buscamos los modelos en donde estamos gestionando la coneccion.
const { models } = require ('../libs/sequelize');

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.Categories.create(data);
    return newCategory;
  }

  async find() {
    const rta = await models.Categories.findAll(/*{
      include: ['products']
    }*/
    // En las categorias seria demasiada informacion poner todas las categorias con tooodos sus productos correspondientesx
    );
    return rta;
  }

  async findOne(id) {
    const rta = await models.Categories.findByPk(id, {
      include: ['products']
    });
    return rta;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = CategoryService;
