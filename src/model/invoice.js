class Invoice {
  constructor(order_id, item_number, product_quantity) {
    this.order_id = order_id;
    this.item_number = item_number;
    this.product_quantity = product_quantity;
  }
}

module.exports = Invoice;