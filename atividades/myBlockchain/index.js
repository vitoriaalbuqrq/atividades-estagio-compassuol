const Blockchain = require('./blockchain');
const Transaction = require('./transaction');

const myBlockchain = new Blockchain();

function main(){
    console.log('\n--------------------------------- CRIANDO A BLOCKCHAIN ---------------------------------');
    createTransactions();
    displayBlockchain();
    console.log('Blockchain é válida?', myBlockchain.isValid());
    displayTransactionHistory('0x0012a536b1d9')
    testBlockchainCorruption();
}

function createTransactions(){
    try {
        myBlockchain.addTransaction(new Transaction('0x0012a536b1d9', '0x0045d9va80v6', 50));
        myBlockchain.addTransaction(new Transaction('0x0012a536b1d9', '0x006325dsa253', 20));
        myBlockchain.addBlock();
        
        myBlockchain.addTransaction(new Transaction('0x00df5d62fd13', '0x0012a536b1d9', 10));
        myBlockchain.addBlock();
    } catch (error){
        console.log("Erro ao adicionar transação:", error.message);
    }
}

function displayBlockchain(){
    console.log(myBlockchain.blocks.map(block => block.toString())
    .join("\n-----------------------------------------------------------------------------------------\n"));
    console.log('-----------------------------------------------------------------------------------------');
}

function displayTransactionHistory(address){
    console.log('\n-------------------------------- HISTÓRICO DE TRANSAÇÕES --------------------------------');
    const transactionHistory = myBlockchain.getTransactionsByAddress(address);

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

function testBlockchainCorruption() {
    console.log('Teste de alteração dos dados...');
    myBlockchain.blocks[1].data[1].receiver = '0x005f682a36b7'; 
    console.log('Blockchain válida após alteração?', myBlockchain.isValid());   
}

main();