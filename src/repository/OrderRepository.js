const orderTeste = require('../model/order');
const path = require('path');
const fs = require('fs');
const OrderTeste = require('../model/order');

class OrderRepository {
  constructor() {
    this.orders = [];
  }

  async readOrders(directoryPath) {
    const files = await fs.promises.readdir(directoryPath);
    const orderFiles = files.filter((file) => path.extname(file) === '.txt');

    for (const file of orderFiles) {
      const filePath = path.join(directoryPath, file);
      const content = await fs.promises.readFile(filePath, 'utf-8');
      const orderData = content
        .trim()
        .split('\n')
        .map((line) => JSON.parse(line));

      const orders = orderData.map((orderData) => {
        const order = new OrderTeste(
          orderData.número_item,
          orderData.código_produto,
          orderData.quantidade_produto,
          orderData.valor_unitário_produto
        );
        return order;
      }
      );
      console.log(orders);
      this.orders = this.orders.concat(orders);
    }
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

module.exports = new OrderRepository();