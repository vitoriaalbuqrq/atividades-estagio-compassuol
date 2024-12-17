# Simple Blockchain 


## 🛠️ Pré-requisitos
É necessario ter o [Node.js](https://nodejs.org/) instalado para executar o projeto.

## Configurações Iniciais

Clone o repositório e acesse o diretório do projeto:
  ```bash
  git clone https://github.com/vitoriaalbuqrq/atividades-estagio-compassuol.git
  cd atividades/myBlockchain
  ```

## ▶️ Execução
Para executar o código, use o comando:
```bash
node index.js
```
## 🗂️ Estrutura do códico
- **Class Block**:
    Representa um bloco na blockchain contendo o tempo de criação do bloco, o hash do bloco anterior, o hash gerado para o bloco atual, as transações (dados) armazenadas no bloco e o nonce necessários encontrar o hash adequado.<br/>

  A classe possui os métodos:
  - `toString()`: Exibe os detalhes do bloco e suas transações com todas as propriedades;
  
  - `generateHash()`: Gera o hash único para o bloco com base no timestamp, lastHash, data e nonce. Utiliza o padrão **SHA-256** para criptografia;

  - `mineBlock(difficulty)`: Minera o bloco com base no Proof of Work. Calcula o hash do bloco enquanto incrementa o nonce a cada tentativa de encontrar o hash que atenda as condições de dificuldade determinada na blockchain.
  
- **Class Transaction**: Contem as propriedades da transação que serão inseridas no bloco como o remetente da transação, destinatário, o valor e a taxa da transação.<br/>
  A classe possui o método:
  - `isValidAddress()`: Verifica se o endereço é válido de acordo com o seguinte critério: o endereço deve iniciar com `0x00` e seguido por 10 caracteres (letras e números).

- **Class Blockchain**: Responsável por gerenciar e validar a cadeia de blocos. Suas propriedades são uma lista de blocos (chain), iniciando com o **bloco genesis**, uma lista de transações pendentes, dificuldade e recompensa da mineração e um objeto que armazena os saldos dos endereços.<br/>
  
  A classe possui os métodos:
  - `createGenesisBlock`: Cria o bloco genesis com as propriedades padrão;
  
  - `getLatestBlock`: Retorna o último bloco da cadeia;

  - `createBlock`: Cria um novo bloco com base nas suas propriedades e em seguida ele é minerado;
  
  - `minePendingTransactions`: Minera transações pendentes, cria um bloco com as recompensas e taxas, atualiza os saldos dos endereços e limpa a lista de transações pendentes.

  - `addTransaction`: Adiciona uma transação na lista de transações pendentes,verificando se o remetente possui saldo suficiente, incluindo a taxa. Se não houver saldo, a transação é rejeitada;
  
  - `getTransactionsByAddress`: Obtém todas as transações de um determinado endereço, adicionando-as em um histórico de transações enviadas e recebidas;
  
  - `getBalance`: Retorna o saldo de um endereço, se o endereço não tiver saldo registrado, retorna 0;
  
  - `updateBalance`: Ajusta o saldo do endereço com base nas transações, adicionando ou subtraindo conforme necessário;
  
  - `isValid`: Valida a integridade da blockchain percorrendo toda a lista de blocos, verificando se os blocos estão ligados entre si através dos hashes e se o hash de cada bloco foi gerado corretamente.
  
- **Class Node**: Simula um nó na rede blockchain, onde varios nós trocam informações sobre blocos e transações e resolvem conflitos (forks). Suas propriedades são: id, uma instância da blockchain e uma lista de nós conectados ao nó.

- **Index**: Simula uma rede de nós em um sistema blockchain, realizando transações, mineração de blocos e exibição de saldos e histórico de transações. 
  - Cria os nós da rede passando instâncias da blockchain;
  - Inicializa a rede, conectando todos os nós; 
  - Minera os blocos com as transações pendentes e propaga para os outros nós da rede; 
  - Simula e resolve um fork ;
  - Exibe a cadeia de blocos com suas informações do nó;
  - Exibe o histórico de transações do endereço determinado.

## Objetivos do projeto

### 1. Simular uma rede onde diferentes “nós” trocam informações sobre blocos e transações. 
- Foi criado uma classe `Node` para gerenciar os nós da rede, realizando a propagação de blocos e transações, de modo que ao conectar um nó ele é adicionado a lista para a comparação das cadeias de blocos.
  
```javascript
class Node {
  constructor(id, blockchain) {
    this.id = id;
    this.blockchain = blockchain;
    this.nodes = [];
  }

  connectNode(node) {
    this.nodes.push(node);
  }
```
- A função `sendTransaction` envia as transações realizadas para todos os nós conectados, onde serão armazenadas em uma lista de transações pendentes para serem adicionadas quando o bloco for minerado. A função `receiveTransaction` é chamada para receber a transação de outro nó e a adicionar à lista de transações pendentes.
- A função `sendeBlock` envia um bloco para todos os nós conectados, chamando a `receiveTransaction` para validar e garantir que eles atualizem suas blockchains com o novo bloco.
  
```javascript
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
```

### 2. Resolver conflitos (forks) e garantir que todos os nós concordem com a mesma cadeia.
- A função `receiveBlock` realiza a validação do bloco e da cadeia para resolver possíveis forks. Se o bloco for inválido ou existir uma cadeia mais longa será resolvido o fork chamando a função `resolveFork` que substitui a cadeia do nó atual pela mais longa encontrada. Para isso, é obtido a cadeia mais longa verificando na lista de cadeias dos nós conectados com a `getLongestChain`. 

```javascript
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
```

### 3. Controlar os saldos dos endereços e garantir que só transações válidas sejam processadas.

- Foi adicionado um objeto `addressBalances` para rastrear e atualizar os saldos de cada endereço na blockchain. Esses saldos são atualizados na `getBalance` ao minerar um novo bloco com a `minePendingTransactions`, na qual adiciona o valor da recompensa com a taxa da transação para endereços de mineradores ou subtrai de endereços que enviaram transações. Além disso, ao adicionar uma transação é realizado é verificado na `addTransaction` se o remetente possui saldo suficiente, antes de adiconar a lista de transações pendentes.
   
```javascript
class Blockchain {
  constructor(genesisBlock) {
    this.addressBalances = {};
    ...
```
```javascript
updateBalance(address, amount) {
  if (this.addressBalances[address]) {
    this.addressBalances[address] += amount;
  } else {
    this.addressBalances[address] = amount;
  }
}

getBalance(address) {
  return this.addressBalances[address] || 0;
}

addTransaction(transaction) {
  if (transaction.sender && this.getBalance(transaction.sender) < (transaction.amount + transaction.fee)) {
    console.log(`O endereço ${transaction.sender} não possui saldo suficiente!`);
    return;
  }
  this.pendingTransactions.push(transaction);
}
```
### 4. Adicionar taxas de transação e recompensas para mineradores.
- Uma taxa fixa no valor 3 foi por transação foi adicionada, sendo descontada e direcionada ao minerador do bloco.
```javascript
class Transaction {
  constructor(sender, receiver, amount) {
    this.fee = 3;
    ...
  }  
```
- Foi adicionado um valor de recompensa, na blockchain, que inicia com 100 e é reduzido pela metade a cada bloco minerado. Na função `minePendingTransactions`, é criada uma transação que atribui a recompensa, somando com o total das taxas de todas as transações pendentes, ao endereço informado. O remetente é definido como null. Após a mineração do bloco, as transações são processadas, e a lista de saldos é atualizada com os valores correspondentes.
  
```javascript
class Blockchain {
  constructor(genesisBlock) {
    this.miningReward = 100;
    ...
```

```javascript
minePendingTransactions(miningRewardAddress) {
  const totalFees = this.pendingTransactions.reduce((sum, tx) => sum + tx.fee, 0);

  let rewardTx = new Transaction(
    null,
    miningRewardAddress,
    this.miningReward + totalFees
  );

  this.pendingTransactions.push(rewardTx);
  
  const block = this.createBlock();
  this.chain.push(block);

  for (const tx of block.data) {
    if (tx.sender) {
      this.updateBalance(tx.sender, -(tx.amount + tx.fee));
    }
    this.updateBalance(tx.receiver, tx.amount);
  }

  this.pendingTransactions = [];
  this.miningReward /= 2;

  return block;
}
```