class Node {
  constructor(id, blockchain) {
    this.id = id;
    this.blockchain = blockchain;
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
    const lastBlock = this.blockchain.getLatestBlock();
  
    if (block.lastHash !== lastBlock.hash) {
      console.log("Bloco inválido!");
      this.resolveFork(this.getLongestChain());
      return;
    }
  
    this.blockchain.chain.push(block);
    this.recalculateBalances();
  
    const longestChain = this.getLongestChain();  
    if (longestChain.length > this.blockchain.chain.length) {
      this.resolveFork(longestChain);
    }
  }

  getLongestChain() {
    let longestChain = this.blockchain.chain;
  
    for (const node of this.nodes) {
      if (node.blockchain.chain.length > longestChain.length && node.blockchain.isValid()) {
        longestChain = nodeChain;
      }
    }
    return longestChain;
  }

  resolveFork(longestChain) {
    console.log("Resolvendo Fork...")
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
