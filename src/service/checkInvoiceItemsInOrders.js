module.exports = (mapOrders, mapInvices) => {
  const errors = []
  mapInvices.forEach((itemNota) => {
    itemNota.forEach((itemNotaContent) => {
      let indicaSeExiste = false;
      mapOrders.get(itemNotaContent.id_pedido).forEach((itemPedido) => {
        if (itemNotaContent.número_item === itemPedido.número_item) {
          indicaSeExiste = true;
        }
      });
      if (indicaSeExiste) {
        return;
      }
      if (!indicaSeExiste) {
        errors.push(`id_pedido not has número_item in orders item_pedido:${itemNotaContent.id_pedido}\n`)
      }
    });
  });
  if (errors.length > 0) {
    throw new Error(`Errors:${errors} `)
  }
}
