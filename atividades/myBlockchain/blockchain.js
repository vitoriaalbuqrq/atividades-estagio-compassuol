const Block = require('./block');

class Blockchain {
  constructor() {
    this.blocks = [this.createGenesisBlock()]; 
    this.transactions = [];
  }

  createGenesisBlock() {
    const timestamp = Date.now(); 
    const hash = Block.generateHash(timestamp, '0', []); 
    return new Block(0, timestamp, '0', hash, []);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  addBlock() {
    const lastBlock = this.blocks[this.blocks.length - 1]; 
    const lastHash = lastBlock.hash;
    const index = lastBlock.index + 1;
    const timestamp = Date.now();
    const data = [...this.transactions];
    const hash = Block.generateHash(timestamp, lastHash, data)

    const newBlock = new Block(index, timestamp, lastHash, hash, data);
    this.blocks.push(newBlock);

    this.transactions = []; //limpa as transações
  }

  isValid() {
    for (let i = 1; i < this.blocks.length; i++) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      if (currentBlock.lastHash !== previousBlock.hash) {
        return false;
      }
      const expectedHash = Block.generateHash(previousBlock.timestamp, previousBlock.lastHash, previousBlock.data);
      if (currentBlock.lastHash !== expectedHash) {
        return false;
      }
    }
    return true;
  }

}
module.exports = Blockchain; 
