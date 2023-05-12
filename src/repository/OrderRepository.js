const orderTeste = require('../model/order');
const path = require('path');
const fs = require('fs');
const Order = require('../entities/order');

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
        .map((line) => {
          let json = line;
          let jsonWithDot = json.replace(/,\s*(\d+)(\D)/g, '.$1$2');
          let order = JSON.parse(jsonWithDot);
          return order;
        })

      const orders = orderData.map((orderData) => {
        const order = new Order(
          orderData.número_item,
          orderData.código_produto,
          orderData.quantidade_produto,
          orderData.valor_unitário_produto
        );
        return order;
      }
      );
      this.orders = this.orders.concat(orders);
    }

    return this.orders
  }

  get() {
    return this.orders;
  }

}

module.exports = OrderRepository;