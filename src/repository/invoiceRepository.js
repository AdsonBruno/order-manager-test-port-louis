const fs = require('fs');
const path = require('path');
const Invoice = require('../entities/invoice');

class InvoiceRepository {
  constructor() {
    this.invoices = [];
  }

  async readInvoices(directoryPath) {
    const files = await fs.promises.readdir(directoryPath);
    const invoiceFiles = files.filter((file) => path.extname(file) === '.txt');

    for (const file of invoiceFiles) {
      const filePath = path.join(directoryPath, file);
      const content = await fs.promises.readFile(filePath, 'utf-8');
      const invoicesData = content
        .trim()
        .split('\n')
        .map((line) => {
          let json = line;
          let jsonWithDot = json.replace(/,\s*(\d+)(\D)/g, '.$1$2');
          let order = JSON.parse(jsonWithDot);
          return order;
        })
      const invoices = invoicesData.map((invoiceData) => {
        const invoice = new Invoice(
          invoiceData.id_pedido,
          invoiceData.número_item,
          invoiceData.quantidade_produto
        );
        return invoice;
      });
      this.invoices = this.invoices.concat(invoices);
    }

    return this.invoices;
  }

  async findByOrderId(id_pedido) {
    const result = this.invoices.filter(invoice => invoice.order_id === id_pedido);
    return Promise.resolve(result);
  }
}

module.exports = new InvoiceRepository();