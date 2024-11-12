const crypto = require("crypto");

class Block {
  constructor(index, timestamp, lastHash = "", data = [], difficulty = 3) {
    this.index = index;
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.data = data;
    this.difficulty = difficulty;
    this.nonce = 0;
    this.mineBlock();
  }

  toString() {
    const transactions = this.data.map(transaction => 
      `Sender: ${transaction.sender}, Receiver: ${transaction.receiver}, Amount: ${transaction.amount}`).join("\n");
    
    return `block: ${this.hash}
            nonce: ${this.nonce}
            lastHash: ${this.lastHash}
            timestamp: ${this.timestamp}
            transactions: \n${transactions}`;
  }

  generateHash() {
    return crypto
      .createHash("sha256")
      .update(`${this.nonce}${this.timestamp}${this.lastHash}${JSON.stringify(this.data)}`)
      .digest("hex");
  }

  mineBlock() {
    this.hash = this.generateHash();

    while (this.hash.substring(0, this.difficulty) !== "0".repeat(this.difficulty)) {
      this.nonce++;
      this.hash = this.generateHash();
    }
  }
}

module.exports = Block;
