const Order = require('./src/entities/order');
const Invoice = require('./src/entities/invoice');
const OrderRepository = require('./src/repository/orderRepository');
const InvoiceRepository = require('./src/repository/invoiceRepository');
const checkInviceItemsInOrders = require('./src/service/checkInvoiceItemsInOrders')
const path = require('path');
const fs = require('fs');
const { error } = require('console');

const orderDir = path.join(__dirname, './Pedidos/');
const invoiceDir = path.join(__dirname, './Notas/');

function valiadteOrders(ordersMap) {
  ordersMap.forEach(order => {
    try {
      new Order(order);
    } catch (error) {
      console.log(error)
    }
  })
}

function valiadteInvoices(invoicesMap) {
  invoicesMap.forEach(invoice => {
    try {
      new Invoice(invoice);
    } catch (error) {
      console.log(error)
    }
  })
}



async function run() {
  try {
    const orderRepository = new OrderRepository()
    const invoiceRepository = new InvoiceRepository()
    const ordersMap = await orderRepository.readOrders(orderDir);
    const invoicesMap = await invoiceRepository.readInvoices(invoiceDir);

    valiadteOrders(ordersMap)
    valiadteInvoices(invoicesMap)
    checkInviceItemsInOrders(ordersMap, invoicesMap)



  } catch (error) {
    //TODO: Melhoria: criar um log para armazerar os erros em uma ferramenta de monitoramento
    console.log(error)
  }



}

run()