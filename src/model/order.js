class Order {

  constructor(orderItems) {
    this.validate(orderItems);
    this.checkSameItemInOrder(orderItems);
    this._orderItems = orderItems;
  }

  get orderItems() {
    return this._orderItems;
  }

  validate(orderItems) {
    for (orderItem of orderItems) {
      if (
        typeof orderItem.número_item !== 'number' ||
        typeof orderItem.código_produto !== 'string',
        typeof orderItem.quantidade_produto !== 'number' ||
        typeof orderItem.valor_unitário_produto !== 'string'

      ) {
        throw new Error('The property value type is invalid')
      }

      if (orderItem.número_item <= 0) {
        throw new Error('The number item shouldbe greather than 0')
      }

      if (orderItem.quantidade_produto <= 0) {
        throw new Error('The number item shouldbe greather than 0')
      }
    }
  }

  checkSameItemInOrder(orderItems) {
    let setItems = new Set();

    for (item of orderItems) {
      setItems.add(item.número_item)
    }
    if (Array.from(setItems).length !== orderItems.length) {
      throw new Error('Exist more then one item with same número item')
    }
  }
}

module.exports = Order;