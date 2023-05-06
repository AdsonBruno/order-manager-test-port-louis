const orderTeste = require('../model/order');
const path = require('path');

class OrderRepository {
  constructor() {
    this.orders = [];
  }

  add(order) {
    console.log(`validate: ${order.validate()}`)
    if (order instanceof orderTeste && order.validate()) {
      this.orders.push(order);
      console.log('Pedido adicionado com sucesso!');
    } else {
      console.log('erro');
      throw new Error(`Invalid order: ${JSON.stringify(order)}`);
    }
    console.log(order)
    return order;
  }

  get() {
    return this.orders;
  }

}

module.exports = OrderRepository;