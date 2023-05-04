const Order = require('./src/presentation/order');
const path = require('path');
const fs = require('fs');
const { error } = require('console');

const orderDir = path.join(__dirname, 'Pedidos/');

async function run() {
  const order = new Order();
  const data = await order.readOrderFileName(orderDir);

  const orders = [];

  const filePath = path.join(orderDir, data[2])
  const conteudo = await order.readOrder(filePath);
  orders.push({ name: data[2], dados: conteudo })
  console.log(orders);



}

run().catch(console.log(error))
