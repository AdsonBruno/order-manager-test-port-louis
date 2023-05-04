const { rejects } = require('assert');
const fs = require('fs');
const path = require('path');

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
}

module.exports = Order;
