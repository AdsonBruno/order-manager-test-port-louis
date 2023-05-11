const Order = require('./src/presentation/order');
const path = require('path');
const fs = require('fs');
const { error } = require('console');

const orderDir = path.join(__dirname, 'Pedidos/');

async function run() {
  const order = new Order();
  const data = await order.readOrderFileName(orderDir);

  const orders = [];


  for (const element of data) {
    const filePath = path.join(orderDir, element);
    const conteudo = await order.readOrder(filePath);
    orders.push({ name: element, dados: conteudo })
  }

  console.log(orders);



}

run().catch(console.log(error))