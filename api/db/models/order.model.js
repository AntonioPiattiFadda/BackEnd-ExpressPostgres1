const {
  Model,
  DataTypes,
  Sequelize,
} = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'Orders';

const OrderSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  total: {
    // COn esto le digo que no es un campo que vayamos a agregar a la tabla realmente
    type: DataTypes.VIRTUAL,
    // Con en get le decimos como vamos a obtener lo que calculamos en ese campo.
    get() {
      if (this.items.length > 0) {
        const totall = this.items.reduce((total, item) => {
          return total + item.price * item.OrderProduct.amount;
        }, 0);
        return totall;
      }
      return 0;
    },
  },
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      //Aca le tengo que decir cual es la tabla ternaria que va a relacionar Products con Orders

      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }
  static config(sequelize) {
    return {
      //Cual va a ser la coneccion que tendra.
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      // timestamp es crear campos por defecto sobre todo en la creacion. POr ahora lo vamos a dejar asi.
      timestamps: false,
    };
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };
