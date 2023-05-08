const OrderTeste = require('../model/order');
const Invoice = require('../model/invoice');
const InvoiceRepository = require('../repository/invoiceRepository');
const OrderRepository = require('../repository/OrderRepository');
const path = require('path');
const fs = require('fs');

class OrderInvoiceMatcher {
  constructor() {
    this.invoiceRepository = InvoiceRepository;
    this.orderRepository = OrderRepository;
  }

  async matchOrdersAndInvoices(orderDir, outro) {
    const orders = await this.orderRepository.readOrders(orderDir);
    const invoices = await this.invoiceRepository.readInvoices(outro);

    const orderItemsMap = new Map();
    const invoiceItemsMap = new Map();


    for (const order of orders) {
      const { número_item, código_produto, quantidade_produto, valor_unitário_produto } = order;
      const items = { código_produto, quantidade_produto, valor_unitário_produto };
      orderItemsMap.set(número_item, items);


    }

    for (const invoice of invoices) {
      const { id_pedido, item_number, product_quantity } = invoice;
      const items = { item_number, product_quantity };
      invoiceItemsMap.set(id_pedido, items);
    }

    return { orderItemsMap, invoiceItemsMap };
  }
}


module.exports = new OrderInvoiceMatcher();