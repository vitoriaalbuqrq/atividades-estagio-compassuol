const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, lastHash, hash, data = []) {
    this.index = index;
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash; 
    this.data = data; 
  } 

  toString() {
    const transactions = this.data.map(transaction => 
      `Sender: ${transaction.sender}, Receiver: ${transaction.receiver}, Amount: ${transaction.amount}`).join("\n");
    
    return `block: ${this.hash}
            index: ${this.index}
            lastHash: ${this.lastHash}
            timestamp: ${this.timestamp}
            transactions: \n${transactions}`;
  }

  static generateHash(timestamp, lastHash, data) {
    return SHA256(`${timestamp}${lastHash}${JSON.stringify(data)}`).toString();
  }
}

module.exports = Block;