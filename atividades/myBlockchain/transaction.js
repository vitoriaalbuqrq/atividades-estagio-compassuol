class Transaction {
  constructor(sender, receiver, amount) {
    if (!this.isValidAddress(sender) || !this.isValidAddress(receiver)) {
      throw new Error("Endereço de origem ou de destino inválido!");
    }

    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.timestamp = Date.now();
    this.fee = 3;
  }

  isValidAddress(address) {
    //Endereço do remetente null em caso de envio de recompensa
    if (address === null) {
      return true;
    }
    const adressFormat = /^0x00[a-zA-Z0-9]{10}$/;
    return adressFormat.test(address);
  }

}

module.exports = Transaction;
