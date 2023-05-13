class Order {

  constructor(orderItems) {
    this.validate(orderItems);
    this.checkSameItemInOrder(orderItems);
    this.checkItemNumberSequence(orderItems);
    this._orderItems = orderItems;
  }

  get orderItems() {
    return this._orderItems;
  }

  validate(orderItems) {
    let orderItem;
    for (orderItem of orderItems) {
      if (
        typeof orderItem.número_item !== 'number' ||
        typeof orderItem.quantidade_produto !== 'number' ||
        typeof orderItem.valor_unitário_produto !== 'number'

      ) {
        throw new Error(`The property value type is invalid ${orderItem.código_produto}`)
      }

      if (typeof orderItem.código_produto !== 'string') {
        throw new Error(`The property value type is invalid ${orderItem.código_produto}`)
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
    let item;
    for (item of orderItems) {
      setItems.add(item.número_item)
    }
    if (Array.from(setItems).length !== orderItems.length) {
      throw new Error('Exist more then one item with same número item')
    }
  }

  checkItemNumberSequence(orderItems) {
    const numberItemsSorted = orderItems.map(item => item.número_item).sort();
    const itemsSequence = Array.from({ length: orderItems.length }, (_, i) => i + 1);
    const wordArrayGenerate = numberItemsSorted.join();
    const wordArrayGenerateToCompare = itemsSequence.join();

    if (wordArrayGenerate !== wordArrayGenerateToCompare) {
      throw new Error(`The número_item has not a consecutive sequence numbers`)
    }

  }
}

module.exports = Order;