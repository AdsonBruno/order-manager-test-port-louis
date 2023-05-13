const fs = require('fs');
const path = require('path');

class InvoiceRepository {
  constructor() {
    this.invoices = [];
  }

  async readInvoices(directoryPath) {
    const files = await fs.promises.readdir(directoryPath);
    const invoiceFiles = files.filter((file) => path.extname(file) === '.txt');
    const notes = new Map();

    for (let file of invoiceFiles) {
      let invoiceId = file[1];
      const filePath = path.join(directoryPath, file);
      const noteContent = await fs.promises.readFile(filePath, 'utf-8');
      const invoicesData = noteContent
        .trim()
        .split('\n')
        .map((line) => {
          let json = line;
          let orderNote = JSON.parse(json);
          return orderNote;
        })

      if (!notes.has(invoiceId)) {
        notes.set(+invoiceId, invoicesData);
      }
    }
    return notes;

  }
}

module.exports = InvoiceRepository;