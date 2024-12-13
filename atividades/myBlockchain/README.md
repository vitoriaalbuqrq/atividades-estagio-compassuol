# Simple Blockchain 
ATIVIDADE 2 - Blockchain simples que permite a criação de transações e inclusão delas em blocos, com as seguintes características:
- Mineração de blocos realizada por meio do mecanismo de Proof of Work (PoW);
- Os endereços de transações seguem uma estrutura para serem considerados válidos;
- Validação simples de integridade da cadeia de blocos.
  
ATIVIDADE FINAL - Implementação das seguintes funcionalidades:
- Simular uma rede onde diferentes “nós” trocam informações sobre blocos e transações.
- Resolver conflitos (forks) e garantir que todos os nós concordem com a mesma cadeia.
- Sistema que controla os saldos dos endereços e garante que só transações válidas sejam processadas.
- Adicionar taxas de transação e recompensas para mineradores.

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
- Class **Block**:
    Representa um bloco na blockchain contendo a posição do bloco na cadeia, o tempo de criação do bloco, o hash do bloco anterior, o hash gerado para o bloco atual, as transações (dados) armazenadas no bloco e o nonce necessários encontrar o hash adequado.<br/>

  A classe possui os métodos:
  - `toString()`: Exibe os detalhes do bloco e suas transações com todas as propriedades;
  
  - `generateHash()`: Gera o hash único para o bloco com base no timestamp, lastHash, data e nonce. Utiliza o padrão **SHA-256** para criptografia;

  - `mineBlock(difficulty)`: Minera o bloco com base no Proof of Work. Calcula o hash do bloco enquanto incrementa o nonce a cada tentativa de encontrar o hash que atenda as condições de dificuldade determinada na blockchain.
  
- Class **Transaction**: Contem as propriedades da transação que serão inseridas no bloco como o remetente da transação, destinatário, o valor e a taxa da transação.<br/>
  A classe possui o método:
  - `isValidAddress()`: Verifica se o endereço é válido de acordo com o seguinte critério: o endereço deve iniciar com `0x00` e seguido por 10 caracteres (letras e números).

- Class **Blockchain**: Responsável por gerenciar os blocos e validar a cadeia de blocos. Suas propriedades são uma lista de blocos (chain), iniciando com o **bloco genesis**, uma lista de transações pendentes. dificuldade e recompensa da mineração e um objeto que armazena os saldos dos endereços.<br/>
  
  A classe possui os métodos:
  - `createGenesisBlock`: Cria o bloco genesis com as propriedades padrão;
  
  - `getLatestBlock`: Retorna o bloco mais recente da cadeia;

  - `createBlock`: Cria um novo bloco com base nas suas propriedades, incluindo o hash do bloco anterior, o index, o timestamp e as transações atuais. Após a criação do bloco, ele é minerado;
  
  - `minePendingTransactions`: Minera as transações pendentes, criando um bloco contendo-as incluindo a recompensa para o minerador e as taxas das transações pendentes. Em seguida, atualiza os saldos dos endereços envolvidos e limpa a lista de transações pendentes.
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
      this.miningReward = this.miningReward / 2;

      return block;
    }
  ```

  - `addTransaction`: Adiciona uma transação na lista de transações pendentes,verificando se o remetente possui saldo suficiente, incluindo a taxa. Se não houver saldo, a transação é rejeitada;
  ```javascript
  addTransaction(transaction) {
    if (transaction.sender && this.getBalance(transaction.sender) < (transaction.amount + transaction.fee)) {
      console.log(`O endereço ${transaction.sender} não possui saldo suficiente!`);
      return;
    }
    this.pendingTransactions.push(transaction);
  }
  ```
  
  - `getTransactionsByAddress`: Obtém todas as transações de um determinado endereço, adicionando-as em um histórico de transações enviadas e recebidas;
  
  - `getBalance`: Retorna o saldo de um endereço, se o endereço não tiver saldo registrado, retorna 0;
  
  - `updateBalance`: Ajusta o saldo do endereço com base nas transações, adicionando ou subtraindo conforme necessário;
  
  - `isValid`: Valida a integridade da blockchain percorrendo toda a lista de blocos, verificando se os blocos estão ligados entre si através dos hashes e se o hash de cada bloco foi gerado corretamente.

- Class **Node**: Simula um nó na rede blockchain, onde varios nós trocam informações sobre blocos e transações e resolvem conflitos (forks). Suas propriedades são: id, uma instância da blockchain e uma lista de nós conectados ao nó.<br/>
  A classe possui o método:
  
  - `connectNode`: Conecta os nós, adicionando os novos nós da rede;
  
  - `sendeTransaction`: Envia uma transação para todos os nós conectados;
  
  - `receiveTransaction`: Recebe uma transação de outro nó e a adiciona à lista de transações pendentes do nó.;
  
  - `sendeBlock`: Envia um bloco para todos os nós conectados, garantindo que eles atualizem suas blockchains com o novo bloco;
  
  - `receiveBlock`: Recebe um bloco, valida a cadeia, se válida, adiciona à blockchain local, caso contrário, resolve forks;
  
  - `resolveFork`: Resolve um fork adotando a cadeia mais longa recebida, garantindo que todos os nós compartilhem a mesma versão da blockchain;
  
  - `recalculateBalances`: Recalcula os saldos de todos os endereços após a adição de um bloco ou resolução de fork.

- `index`: Simula uma rede de nós em um sistema blockchain, realizando transações, mineração de blocos e exibição de saldos e histórico de transações. 
  - Cria os nós da rede;
  - Inicializa a rede, conectando todos os nós; 
  - Minera os blocos com as transações pendentes e propaga para os outros nós da rede; 
  - Exibe a cadeia de blocos com suas informações do nó;
  - Exibe o histórico de transações do endereço determinado.
