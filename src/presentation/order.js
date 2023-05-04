const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

class Order {
  constructor() {
  }

  readOrderFileName(path) {

    return new Promise((resolve, reject) => {
      fs.readdir(path, 'utf-8', (err, files) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        resolve(files);
      })
    })
  }

  readOrder(path) {
    return new Promise((resolve, rejects) => {
      fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        err ? reject(err) : resolve(data);
      })

    })
  }
}



module.exports = Order;
