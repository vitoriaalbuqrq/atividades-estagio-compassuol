const Blockchain = require('./blockchain');
const Transaction = require('./transaction');

const myBlockchain = new Blockchain();

console.log('-------------------- CRIANDO A BLOCKCHAIN --------------------');

myBlockchain.addTransaction(new Transaction('0x001', '0x002', 50));
myBlockchain.addTransaction(new Transaction('0x002', '0x003', 20));
myBlockchain.addBlock();

myBlockchain.addTransaction(new Transaction('0x003', '0x001', 10));
myBlockchain.addBlock();

console.log('Blockchain é válida?', myBlockchain.isValid());

console.log('--------------------------------------------------------------');
console.log(myBlockchain.blocks.map(block => block.toString())
    .join("\n--------------------------------------------------------------\n"));
console.log('--------------------------------------------------------------');
console.log('Teste de alteração dos dados...');
myBlockchain.blocks[1].data[0].receiver = '0x004'; 
console.log('Blockchain válida após alteração?', myBlockchain.isValid());
