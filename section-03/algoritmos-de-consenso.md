# Algoritmos de consenso

Algoritmos de consenso são utilizados em sistemas distribuídos para fazer com que os nós/computadores cheguem em um acordo sobre a validade de uma transação.

1. **Proof of Work**: Os mineradores da rede competem entre si resolvendo um problema matemático complexo. O primeiro a encontrar o hash, o bloco é minerado e a transação validada por consenso. No entanto, ocorre alto gasto de energia, é lento e caro para operar.

2. **Proof of Stake**: Os validadores são selecionados aleatoriamente para validar blocos com base nos tokens depositados na rede. Quem valida corretamente aumenta suas chances futuras, e quem comete erros perde os tokens (stake). O PoS é mais rápido e energeticamente eficiente.
    
    3. **Delegated Proof of Stake**: Os detentores de tokens votam em um grupo de delegados para validar transações e criar novos blocos em seu nome. são escolhidos com base em seu nivel de atividade e contribuição para a rede. 
    
    4. **Leased Proof of Stake**: Os usuários podem arrendar suas moedas a um delegado em troca de recompensas. O delegado usa essas moedas emprestadas para aumentar seu poder de voto na rede e validar transações. 

5. **Proof of Authority**: Usado principalmente em blockchains privados ou de consórcio. Os validadores nesta rede são indivíduos conhecidos e confiáveis, autorizados a validar transações na rede. 

6. **Byzantine Fault Tolerance**: É projetado para garantir que a rede continue funcional, mesmo que alguns nós se comportem de maneira maliciosa ou falhem. Ele exige que múltiplos nós concordem sobre o estado do blockchain antes de adicionar novos blocos.
    
    7. **Pratical Byzantine Fault Tolerance**: É uma variante mais eficiente do BFT. Ele requer que pelo menos 2/3 dos validadores concordem com uma transação para que ela seja validada. Não é ideal para grandes redes devido ao aumento no número de mensagens trocadas.
    
    8. **Delegated Byzantine Fault Tolerance**:  Grupos de validadores elegem líderes (delegados) que propõem novos blocos. Os outros validadores confirmam os blocos propostos. Isso reduz o número de nós necessários para chegar ao consenso.
   
9. **Direct Acyclic Graph**: O DAG é uma estrutura de dados não linear em que cada transação aprova uma ou mais transações anteriores. Como não há blocos, as transações são processadas em paralelo.
    
10.  **Proof of Capacity**: Participantes da rede reservam espaço em disco para armazenar dados relacionados à blockchain. Quanto mais espaço reservado, maior a chance de validar blocos.
    
11.  **Proof of Burn**: Os validadores devem “queimar” criptomoedas (enviá-las para um endereço inacessível) para ganhar o direito de validar transações. Isso reduz o fornecimento total da moeda, incentivando a valorização.
    
12.  **Proof of Identity**: Os validadores devem comprovar sua identidade usando documentos, biometria ou mídias sociais. Apenas usuários verificados podem validar transações. Reduz fraudes e aumenta a segurança.

13.  **Proof of Activity**: Mecanismo de consenso híbrido que combina prova de trabalho e prova de participação para ajudar a garantir a segurança e a confiabilidade da rede. Primeiro, mineradores criam blocos usando PoW. Em seguida, validadores usam PoS para validar o bloco.
    
14.  **Proof of Elapsed Time**: Cada nó da rede gera um tempo de espera aleatório. O nó que termina seu tempo de espera primeiro valida o bloco. O PoET utiliza hardware seguro (TEEs) para garantir que o tempo de espera não seja manipulado.
    
15. **Proof of Importance**: Os nós são selecionados com base em seu nível de atividade na rede e quantidade de moedas mantidas. Quem realiza mais transações tem maior chance de validar blocos.
    
16. **Proof of Weight:** Baseia-se em um critério específico para atribuir peso a cada participante da rede. O peso pode ser definido pela quantidade de moedas, tempo de participação, armazenamento de dados ou reputação.
    
17. **Unique Node List:** Uma lista de nós confiáveis valida transações por meio de assinaturas. Os nós não realizam mineração nem apostam recursos; apenas verificam se a transação é válida.