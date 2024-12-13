const Blockchain = require("./blockchain");

class Node {
  constructor(id) {
    this.id = id;
    this.blockchain = new Blockchain();
    this.nodes = [];
  }

  connectNode(node) {
    this.nodes.push(node);
  }

  sendTransaction(transaction) {
    for (const node of this.nodes) {
      node.receiveTransaction(transaction);
    }
  }

  receiveTransaction(transaction) {
    this.blockchain.addTransaction(transaction);
  }

  sendBlock(block) {
    for (const node of this.nodes) {
      node.receiveBlock(block);
    }
  }

  receiveBlock(block) {    
    if (this.blockchain.isValid()) {
      let longestChain = this.blockchain.chain;
  
      for (const node of this.nodes) {
        if (node.blockchain.chain.length > longestChain.length) {
          longestChain = node.blockchain.chain;
        }
      }

      if (longestChain.length > this.blockchain.chain.length) {
        this.resolveFork(longestChain);
      } else {
        this.blockchain.chain.push(block);
        this.recalculateBalances();
      }
    } else {
      console.log("Cadeia inválida.");
    }
  }

  resolveFork(longestChain) {
    this.blockchain.chain = [...longestChain];
    this.recalculateBalances();
  }

  recalculateBalances() {
    this.blockchain.addressBalances = {};
    for (const block of this.blockchain.chain) {
      for (const tx of block.data) {
        if (tx.sender) {
          this.blockchain.updateBalance(tx.sender, -(tx.amount + tx.fee));
        }
        this.blockchain.updateBalance(tx.receiver, tx.amount);
      }
    }  
    this.blockchain.miningReward = this.blockchain.miningReward / 2;
  }
}

module.exports = Node;
