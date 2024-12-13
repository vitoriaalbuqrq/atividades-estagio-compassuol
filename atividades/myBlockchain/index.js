const Transaction = require('./transaction');
const Node = require('./node'); 


const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);

function main(){
    initializeNetwork()
    displayBalances(node1);
    console.log('\n--------------------------------------- BLOCKCHAIN --------------------------------------');
    displayBlockchain(node1);
    displayTransactionHistory('0x0012a536b1d9', node1)
}

function initializeNetwork() {
  
    node1.connectNode(node2);
    node1.connectNode(node3);
    node2.connectNode(node1);
    node2.connectNode(node3);
    node3.connectNode(node1);
    node3.connectNode(node2);
  
    const newBlock1 = node1.blockchain.minePendingTransactions('0x0012a536b1d9');
    node1.sendBlock(newBlock1);
    
    const tx1 = new Transaction('0x0012a536b1d9', '0x0045d9va8b6f', 50);
    const tx2 = new Transaction('0x0012a536b1d9', '0x0045d9va8b6f', 10);
    node1.sendTransaction(tx1);
    node1.sendTransaction(tx2);
    
    const newBlock2 = node2.blockchain.minePendingTransactions('0x006325d2e4fe');
    node2.sendBlock(newBlock2);
}

function displayBlockchain(node){
    console.log(node.blockchain.chain.map(block => block.toString())
    .join("\n-----------------------------------------------------------------------------------------\n"));
    console.log('-----------------------------------------------------------------------------------------');
}

function displayTransactionHistory(address, node){
    console.log(`\n----------------- HISTÓRICO DE TRANSAÇÕES DO ENDEREÇO: ${address} -------------------`);
    const transactionHistory = node.blockchain.getTransactionsByAddress(address);

    function displayTransactions(type, transactions){
        if (transactions.length > 0){
            console.log(`\n---------------------------------- Transações ${type} ----------------------------------`);
            transactions.forEach(tx => {
                console.log(`Sender: ${tx.sender} | Receiver: ${tx.receiver} | Amount: ${tx.amount} | Timestamp: ${tx.timestamp}`);
            })
        } else {
            console.log(`Nenhuma transação ${type} com esse endereço.`);
        }
    }
    displayTransactions('enviadas', transactionHistory.transactionsSent);
    displayTransactions('recebidas', transactionHistory.transactionReceived);

}

function displayBalances(node) {
    console.log(`SALDOS DOS ENDEREÇOS:`);
    for (let address in node.blockchain.addressBalances) {
        console.log(`Address: ${address} | Balance: ${node.blockchain.addressBalances[address]}`);
    }
}

main();