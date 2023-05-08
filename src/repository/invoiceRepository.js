const fs = require('fs');
const path = require('path');
const Invoice = require('../model/invoice');

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
        .map((line) => JSON.parse(line));
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

const orderDir = path.join(__dirname, '../../Notas');
const repository = new InvoiceRepository();

async function test() {
  await repository.readInvoices(orderDir);
  const result = await repository.findByOrderId(1);
  console.log(result);
}

test();

module.exports = new InvoiceRepository();