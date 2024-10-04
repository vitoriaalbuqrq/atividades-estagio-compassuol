## 💰 Bitcoin e Blockchain - Conceitos Fundamentais

O **Bitcoin** é uma unidade de troca que permite a compra de bens e serviços, funcionando como uma moeda, mas também como um sistema de pagamentos. Ele possibilita transferências diretas entre usuários usando seu protocolo, sem a necessidade de serviços externos. O Bitcoin é considerado seguro, pois utiliza criptografia e é construído em uma blockchain de redes descentralizadas.

## **Bitcoin Vs Bancos**
Comparação do funcionamento entre o sistema tradicional bancário e o Bitcoin:

| Característica | Sistema Tradicional | Bitcoin |
| --- | --- | --- |
| **Contabilidade** | Centralizada, sujeito a erros | Registrada na blockchain, permanente |
| **Armazenamento** | Apenas uma fração é mantida | Valor total é armazenado |
| **Segurança** | Sistemas de segurança próprios dos bancos | Proteção por criptografia |
| **Transações** | Centralizadas e dependentes do banco | Descentralizadas, peer-to-peer |
| **Autenticação** | Centralizado, recebe um comprovante | Registrada na blockchain |
| **Regulamentação** | Regido por leis e normas | Sem regulamentação, indefinida |
| **Processo de Decisão** | Arbitrária, decisões pelo banco central | Consenso, decisões feitas pela rede de participantes |
| **Controle de Dinheiro** | Controlado por bancos, com possíveis restrições | Total controle individual, sem restrições |

## Blockchain
A blockchain é uma cadeia de blocos, onde cada bloco contém dados, como transações no caso do Bitcoin, ou outros tipos de informações. Cada bloco tem um hash único que o identifica, além de conter o hash do bloco anterior. Se um dado for alterado, toda a blockchain é modificada (Puzzle Friendly), pois o hash converte os dados em uma string criptográfica única e de tamanho fixo.

### **Funções Hash** 
- Fácil de computar;
- Livre de colisão: Improvável dois inputs com o mesmo output;
- Puzzle Friendly: Qualquer modificação no texto de entrada, o de saída muda completamente.

### **Assinaturas Digitais**
- Mecanismo de segurança para garantir que apenas o proprietário legítimo possa autorizar transações.

- Qualquer um pode verificar sua assinatura. Isso funciona através de um sistema de criptografia de **chave pública**, ela esta associada com a identidade, e é possível possuir varias chaves públicas.

- A **Chave Secreta** é usada exclusivamente pelo proprietário para assinar transações.


## O Bitcoin

- A rede Bitcoin é constituida por uma rede de computadores de forma distribuida que se conectam entre si.
- Sem Hierarquia, não existe um servidor central.
- Protocolo de consenso, todos os computadores da rede precisam entrar em acordo. 
- Qualquer computador conectado à rede blockchain é um nó. existe dois tipos:
  - **FULL NODES**: precisa ter a blockchain inteira no seu computador, validam todas as transações e os blocos novos que são criados.
  - **LITE NODES**: Armazenam apenas parte da blockchain, necessitam de informações de outros nós.

### **Mineradores**
São responsáveis por criar novos blocos e validar as transações recebidas. Eles competem entre si pelo direito de adicionar o próximo bloco na blockchain.

- **Proof of Work**: É a prova de trabalho que os mineradores utilizam para provarem que trabalharam para encontrar esse bloco. Eles tentam encontrar um **Nonce** (número aleatório) que, ao ser combinado com os dados do bloco, gere um hash que esteja abaixo de um certo nível de dificuldade definido pela rede.

- Mineradores ganham dinheiro principalmente por meio da **coinbase transaction**, além das tarifas de transação. O minerador que encontra um novo bloco tem o direito de incluir essa transação, criando um número definido de novos bitcoins, geralmente enviados para si mesmo.

- **Mining Pools**: Pode ser muito custoso minerar sozinho, por isso existe as Mining Pools, grupos de mineradores coordenados por um nó central. O coordenador cria o bloco e os mineradores trabalham para encontrá-lo. Quando um bloco é descoberto, a recompensa é enviada ao coordenador, que a distribui entre os mineradores participantes.

### **Gasto Duplo**
O trabalho dos mineradores garante a segurança da rede Bitcoin, prevenindo o gasto duplo, onde alguém tenta usar a mesma quantia de bitcoins mais de uma vez. Antes do Bitcoin, esse problema era comum em moedas digitais. Graças ao Proof of Work, o Bitcoin impede essa fraude, pois é necessário algumas confirmações.

#### O que acontece se dois mineradores encontrarem o bloco ao mesmo tempo?
É possível dois mineradores encontrarem o bloco ao mesmo tempo e gerar dois ramos na rede, porém a medida o ramo de blocos cresce, os mineradores percebem e seguem a regra de extenderem o ramo mais longo da blockchain, eliminando assim a biforcação e a cadeia continua linear.

## O Bitcoin na prática

Ter bitcoins significa saber uma chave secreta que seja asssociada a uma chave pública para qual bitcoins estão apontando.

### **Carteiras**

- **Carteira de papel**: Papel com a chave pública e a chave secreta, cada carteira tem apenas um par CP/CS;

- **Carteira de hardware**: Extremamente seguras, interface seguras com computador e permite múltiplos pares de CP/CS;

- **Carteira de Software**: É prático e tem vários serviços embutidos, recuperação de moedas, é mais arriscado e não recomendado para valores grandes.

### **Exchanges**
Exchanges são sistemas online onde o usuário cria um crédito, depositando dinheiro e usa esse dinheiro para comprar criptomoedas. É a maneira mais tradicional e mais prática de negociar bitcoins, porém as Exchanges estão sujeitas e bastante visadas para ataques hackers.

### **Anonimato**

Pode ser fácil associar uma chave pública a uma identidade. Muitos serviços baseados em Bitcoin requerem a identidade ou informações a respeito do usuário, como as Exchanges, carteiras, ao realizar compras. Por isso, o anonimato no Bitcoin não é tão absoluto quanto muitos acreditam. São necessário tomar algumas medidas de precaução.

## O Ethereum
É uma moeda que agrega as funções do bitcoin e também incorporam a capacidade de realizar processamento.
- Tem o segundo maior cap rate ;
- Utilizada para diversas applicações possíveis;
- Possui uma moeda nativa: Ether;
- Mineração Memory Hard;
- Qualquer algoritmo pode ser executado na rede Ethereum;
- Máquina de estado, baseado em contas e estados: Externally Owned Accounts(EOA) e Contract Accounts;

- **A Ethereum Virtual Machine**: A Ethereum Virtual Machine (EVM) atua como um intermediário, criando um computador virtual dentro de qualquer dispositivo que tenha o software instalado. Ela permite que o Ethereum funcione da mesma maneira, independentemente do tipo de máquina que esteja rodando o nó da rede.

- **GAS**: GAS é a unidade que mede o custo computacional necessário para executar transações e contratos inteligentes na rede Ethereum. 

- **Smart Contracts**: São um conjunto de regras combinadas entre duas ou mais partes, traduzida em código computacional, verificável e auto executável.

