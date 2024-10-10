# Simple Blockchain 
Blockchain simples que permite a criação de transações e inclusão delas em blocos. Os blocos são inseridos na blockchain e em seguida é realizado uma validação para verificar sua integridade.

## Pré-requisitos
É necessario ter o [Node.js](https://nodejs.org/) instalado para executar o projeto.

## Configurações Iniciais

1. Clone o repositório:
  ```bash
  git clone https://github.com/vitoriaalbuqrq/myBlockchain.git
  cd atividades/myBlockchain
  ```
1. Instale as dependências:
  ```bash
  npm install
  ```
  Será instalado a biblioteca `crypto-js` utilizada no projeto para gerar os hashes.

## Execução
Para executar o código, use o comando:
```bash
node index.js
```
## Estrutura do códico:
- Class **Block**:
    Representa um bloco na blockchain contendo a posição do bloco na cadeia, o tempo de criação do bloco, o hash do bloco anterior, o hash gerado para o bloco atual e as transações (dados) armazenadas no bloco.
  
  ```javascript
  class Block {
    constructor(index, timestamp, lastHash, hash, data = []) {
      this.index = index;
      this.timestamp = timestamp;
      this.lastHash = lastHash;
      this.hash = hash; 
      this.data = data; 
    }
    ...
  }
  ```
  
  A classe possui os métodos:
  - `toString()`: Exibe os detalhes do bloco e suas transações com todas as propriedades.
  ```javascript
  toString() {
    const transactions = this.data.map(transaction => 
      `Sender: ${transaction.sender}, Receiver: ${transaction.receiver}, Amount: ${transaction.amount}`).join("\n");
    
    return `block: ${this.hash}
            index: ${this.index}
            lastHash: ${this.lastHash}
            timestamp: ${this.timestamp}
            transactions: \n${transactions}`;
  }
  ```
  - `generateHash()`: Gera o hash único para o bloco com base no timestamp, lastHash, data. Utiliza o algoritimo criptográfico SHA-256 através da lib **crypto-js**.

  ```javascript
  static generateHash(timestamp, lastHash, data) {
      return SHA256(`${timestamp}${lastHash}${JSON.stringify(data)}`).toString();
  }
  ```

- Class **Transaction**: Contem as propriedades da transação que serão inseridas no bloco como o remetente da transação, destinatário e o valor da transação.
  ```javascript
  class Transaction {
    constructor(sender, receiver, amount) {
      this.sender = sender;
      this.receiver = receiver;
      this.amount = amount;
    }
  }
  ```

- Class **Blockchain**: Responsável por gerenciar os blocos e validar a cadeia de blocos. Suas propriedades são uma lista de blocos, iniciando com o **bloco genesis** e uma lista de transações.
  ```javascript
  class Blockchain {
    constructor() {
      this.blocks = [this.createGenesisBlock()]; 
      this.transactions = [];
    }
  }
  ```
  
  A classe possui os métodos:
  - `createGenesisBlock`: Cria o bloco genesis com as propriedades padrão:
  ```javascript
    createGenesisBlock() {
      const timestamp = Date.now(); 
      const hash = Block.generateHash(timestamp, '0', []); 
      return new Block(0, timestamp, '0', hash, []);
  }
  ```
  - `addTransaction`: Adiciona uma transação na lista de transações:
  ```javascript
    addTransaction(transaction) {
      this.transactions.push(transaction);
    }
  ```
  - `addBlock`: Cria um novo bloco com base nas propriedades do bloco, incluindo o hash do bloco anterior, o index, o timestamp e as transações atuais. O hash do novo bloco é calculado utilizando essas informações, o novo bloco é adicionado à blockchain, e a lista de transações é limpa:
  ```javascript
    addBlock() {
      const lastBlock = this.blocks[this.blocks.length - 1]; 
      const lastHash = lastBlock.hash;
      const index = lastBlock.index + 1;
      const timestamp = Date.now();
      const data = [...this.transactions];
      const hash = Block.generateHash(timestamp, lastHash, data)

      const newBlock = new Block(index, timestamp, lastHash, hash, data);
      this.blocks.push(newBlock);

      this.transactions = []; //limpa as transações
    }
  ```
  - `isValid`: Valida a integridade da blockchain percorrendo toda a lista de blocos e verificando se os blocos estão ligados entre si através dos hashes e se o hash de cada bloco foi gerado corretamente.
  ```javascript
      isValid() {
        for (let i = 1; i < this.blocks.length; i++) {
          const currentBlock = this.blocks[i];
          const previousBlock = this.blocks[i - 1];

          if (currentBlock.lastHash !== previousBlock.hash) {
            return false;
          }
          const expectedHash = Block.generateHash(previousBlock.timestamp, previousBlock.lastHash, previousBlock.data);
          if (currentBlock.lastHash !== expectedHash) {
            return false;
          }
        }
      return true;
    }
  ```

- `index`: Cria a blockchain com os dados necessários e exibe as informações dos blocos.
  - Instancia a blockchain, cria e adiciona transações a lista.
  ```javascript
    const myBlockchain = new Blockchain();

    console.log('-------------------- CRIANDO A BLOCKCHAIN --------------------');

    myBlockchain.addTransaction(new Transaction('0x001', '0x002', 50));
    myBlockchain.addTransaction(new Transaction('0x002', '0x003', 20));
    myBlockchain.addBlock();

    myBlockchain.addTransaction(new Transaction('0x003', '0x001', 10));
    myBlockchain.addBlock();
    ```
  - Verifica se a blockchain é válida:
  ```javascript
    console.log('Blockchain é válida?', myBlockchain.isValid());      
  ```
  - Exibe a lista de blocos com suas informações:
  ```javascript
    console.log(myBlockchain.blocks.map(block => block.toString())
    .join("\n--------------------------------------------------------------\n")); 
  ```
  - Testa se a blockchain detecta corretamente a adulteração de dados:
  ```javascript
  console.log('Teste de alteração dos dados...');
  myBlockchain.blocks[1].data[0].receiver = '0x004'; 
  console.log('Blockchain válida após alteração?', myBlockchain.isValid());
  ```


  


