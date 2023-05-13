const path = require('path');
const fs = require('fs');

class OrderRepository {
  constructor(orderDir) {
    this.orders = [];
    this.readOrders(orderDir)
  }

  async readOrders(orderDir) {
    const files = await fs.promises.readdir(orderDir);
    const orderFiles = files.filter((file) => path.extname(file) === '.txt');
    const pedidos = new Map();

    for (let file of orderFiles) {
      let fileOrderId = file[1];
      const filePath = path.join(orderDir, file);
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

      pedidos.set(+fileOrderId, orderData)
    }

    return pedidos
  }

  get() {
    return this.orders;
  }
}

module.exports = OrderRepository;