class OrderTeste {
  constructor(número_item, código_produto, quantidade_produto, valor_unitário_produto) {
    this.número_item = número_item;
    this.código_produto = código_produto;
    this.quantidade_produto = quantidade_produto;
    this.valor_unitário_produto = valor_unitário_produto;
  }

  validate() {
    const keys = Object.keys(this);

    if (keys.length !== 4) {
      return false;
    }

    const expectedKeys = [
      'número_item',
      'código_produto',
      'quantidade_produto',
      'valor_unitário_produto'
    ];

    for (const key of expectedKeys) {
      if (!keys.includes(key)) {
        console.log(`A chave ${key} não foi encontrada.`);
        return false;
      }
    }

    const { número_item, código_produto, quantidade_produto, valor_unitário_produto } = this;

    if (
      typeof número_item !== 'number' ||
      typeof código_produto !== 'string',
      typeof quantidade_produto !== 'number' ||
      typeof valor_unitário_produto !== 'string'

    ) {
      return false;
    }

    if (número_item <= 0 || quantidade_produto <= 0) {
      return false;
    }

    const value = valor_unitário_produto.replace(',', '.');
    if (isNaN(parseFloat(value) || parseFloat(value) <= 0)) {
      return false;
    }

    return true;
  }
}

module.exports = OrderTeste;