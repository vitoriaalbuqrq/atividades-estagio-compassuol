class Transaction {
  constructor(sender, receiver, amount) {
    if (!this.isValidAddress(sender) || !this.isValidAddress(receiver)) {
      throw new Error("Endereço de origem ou de destino inválido!");
    }
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.timestamp = Date.now();
  }

  isValidAddress(address) {
    const adressFormat = /^0x00[a-zA-Z0-9]{10}$/;
    return adressFormat.test(address);
  }
}

module.exports = Transaction;
