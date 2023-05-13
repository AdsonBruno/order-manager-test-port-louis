class Invoice {
  constructor(invoices) {
    this.validateInvoice(invoices);
  }

  validateInvoice(invoices) {
    let invoice;
    for (invoice of invoices) {
      if (typeof invoice.id_pedido !== 'number' || typeof invoice.id_pedido !== 'string') {
        throw new Error('The type of id_pedido property is invalid');
      }

      if (
        typeof invoice.número_item !== 'number' ||
        typeof invoice.quantidade_produto !== 'number'
      ) {
        throw new Error(' The property value type is invalid');
      }

      if (invoice.número_item <= 0) {
        throw new Error('The number invoice shoudbe greather than 0');
      }

      if (invoice.quantidade_produto <= 0) {
        throw new Error('The number invoice shoudbe greather than 0');
      }
    }
  }
}

module.exports = Invoice;