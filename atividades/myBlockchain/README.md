# Simple Blockchain 
Blockchain simples que permite a criação de transações e inclusão delas em blocos, com as seguintes características:
- Mineração de blocos realizada por meio do mecanismo de Proof of Work (PoW);
- Os endereços de transações seguem uma estrutura para serem considerados válidos;
- Validação simples de integridade da cadeia de blocos.

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
    Representa um bloco na blockchain contendo a posição do bloco na cadeia, o tempo de criação do bloco, o hash do bloco anterior, o hash gerado para o bloco atual, as transações (dados) armazenadas no bloco, a dificuldade de mineração e o nonce necessários encontrar o hash adequado.<br/>

  A classe possui os métodos:
  - `toString()`: Exibe os detalhes do bloco e suas transações com todas as propriedades;
  
  - `generateHash()`: Gera o hash único para o bloco com base no timestamp, lastHash, data e nonce. Utiliza o padrão **SHA-256** para criptografia;

  - `mineBlock()`: Minera o bloco com base no Proof of Work. Calcula o hash do bloco enquanto incrementa o nonce a cada tentativa de encontrar o hash que atenda as condições de dificuldade.
  
- Class **Transaction**: Contem as propriedades da transação que serão inseridas no bloco como o remetente da transação, destinatário e o valor da transação.<br/>
  A classe possui o método:
  - `isValidAddress()`: Verifica se o endereço é válido de acordo com o seguinte critério: o endereço deve iniciar com `0x00` e seguido por 10 caracteres (letras e números).

- Class **Blockchain**: Responsável por gerenciar os blocos e validar a cadeia de blocos. Suas propriedades são uma lista de blocos, iniciando com o **bloco genesis** e uma lista de transações pendentes.<br/>
  
  A classe possui os métodos:
  - `createGenesisBlock`: Cria o bloco genesis com as propriedades padrão;
  
  - `addTransaction`: Adiciona uma transação na lista de transações pendentes;
  
  - `createBlock`: Cria um novo bloco com base nas suas propriedades, incluindo o hash do bloco anterior, o index, o timestamp e as transações atuais;
  
  - `addBlock`: O novo bloco é adicionado à cadeia de blocos da blockchain, e a lista de transações é limpa;
  
  - `getTransactionsByAddress`: Obtém todas as transações de um determinado endereço, adicionando-as em um histórico de transações enviadas e recebidas;
  
  - `isValid`: Valida a integridade da blockchain percorrendo toda a lista de blocos, verificando se os blocos estão ligados entre si através dos hashes e se o hash de cada bloco foi gerado corretamente.

- `index`: Cria a blockchain com os dados necessários. exibe e valida as informações dos blocos.
  - Instancia a blockchain, cria e adiciona transações a lista;
  - Verifica se a blockchain é válida;
  - Exibe a lista de blocos com suas informações;
  - Exibe o histórico de transações do endereço determinado;
  - Testa se a blockchain detecta corretamente a adulteração de dados.
  
