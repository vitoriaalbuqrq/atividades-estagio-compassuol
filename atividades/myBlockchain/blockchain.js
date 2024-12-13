const Block = require('./block');
const Transaction = require('./transaction');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
    this.difficulty = 3;
    this.miningReward = 100;
    this.addressBalances = {};
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), []);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  createBlock() {
    const lastBlock = this.getLatestBlock();
    const lastHash = lastBlock.hash;
    const index = lastBlock.index + 1;
    const timestamp = Date.now();
    const data = [...this.pendingTransactions];
    let block = new Block(index, timestamp, lastHash, data);
    block.mineBlock(this.difficulty);

    return block;
  }

  minePendingTransactions(miningRewardAddress) {
    const totalFees = this.pendingTransactions.reduce((sum, tx) => sum + tx.fee, 0);

    let rewardTx = new Transaction(
      null,
      miningRewardAddress,
      this.miningReward + totalFees
    );

    this.pendingTransactions.push(rewardTx);
    
    const block = this.createBlock();
    this.chain.push(block);

    for (const tx of block.data) {
      if (tx.sender) {
        this.updateBalance(tx.sender, -(tx.amount + tx.fee));
      }
      this.updateBalance(tx.receiver, tx.amount);
    }

    this.pendingTransactions = [];
    this.miningReward = this.miningReward / 2;

    return block;
  }

  addTransaction(transaction) {
    if (transaction.sender && this.getBalance(transaction.sender) < (transaction.amount + transaction.fee)) {
      console.log(`O endereço ${transaction.sender} não possui saldo suficiente!`);
      return;
    }
    this.pendingTransactions.push(transaction);
  }

  getTransactionsByAddress(address) {
    let history = { transactionsSent: [], transactionReceived: [] };

    for (const block of this.chain) {
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

  getBalance(address) {
    return this.addressBalances[address] || 0;
  }

  updateBalance(address, amount) {
    if (this.addressBalances[address]) {
      this.addressBalances[address] += amount;
    } else {
      this.addressBalances[address] = amount;
    }
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

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
