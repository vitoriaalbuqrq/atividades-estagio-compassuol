const Block = require('./block');

class Blockchain {
  constructor() {
    this.blocks = [this.createGenesisBlock()];
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), []);
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  createBlock() {
    const lastBlock = this.blocks[this.blocks.length - 1];
    const lastHash = lastBlock.hash;
    const index = lastBlock.index + 1;
    const timestamp = Date.now();
    const data = [...this.pendingTransactions];

    return new Block(index, timestamp, lastHash, data);
  }

  addBlock() {
    const newBlock = this.createBlock();
    this.blocks.push(newBlock);
    this.pendingTransactions = [];
  }

  getTransactionsByAddress(address) {
    let history = { transactionsSent: [], transactionReceived: [] };

    for (const block of this.blocks) {
      for (const transaction of block.data) {
        if (transaction.sender === address) {
          history.transactionsSent.push(transaction);
        } else if (transaction.receiver === address) {
          history.transactionReceived.push(transaction);
        }
      }
    }
    return history;
  }

  isValid() {
    for (let i = 1; i < this.blocks.length; i++) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      if (currentBlock.lastHash !== previousBlock.hash) {
        return false;
      }
      if (currentBlock.lastHash !== previousBlock.generateHash()) {
        return false;
      }
    }
    return true;
  }
}
module.exports = Blockchain;
