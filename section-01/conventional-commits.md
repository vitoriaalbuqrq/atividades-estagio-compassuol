# Conventional Commits

Conventional Commits é uma especificação para adicionar significado às mensagens de commit, tornando-as mais legíveis e fáceis de entender. Esta convenção segue um formato estruturado que ajuda a compreensão do histórico do projeto.
[Documentação completa](https://www.conventionalcommits.org/en/v1.0.0/)

## **Tipos de Commits**

| Tipos | Função |
| --- | --- |
| **FEAT** | Implementação de uma funcionalidade |
| **FIX** | Correção de um bug |
| **CHORE** | Adição ou configuração de uma dependência do projeto |
| **REFACTOR** | Nem correção nem implementação |
| **PERF** | Melhoria de performace |
| **TEST** | Adição ou modificação de testes de unidade, e2e, integração, etc |
| **STYLE** | Alterações em estilos CSS, remoção de linhas/espaços em branco, etc |
| **DOCS** | Documentação do projeto |

### **Padrão de mensagem**

```html
tipo(escopo opcional): mensagem imperativa max 40 letras

...corpo opcional

..rodapé opcional
```

> É ideal que a **MENSAGEM SEJA IMPERATIVA,** com verbos apenas no presente. Pense no seguinte para fazer a mensagem: **esse commit ele?**


## Exemplos
```bash
feat(login): adicionar inputs de email, senha, confirmarSenha

fix(login): aconteca login apenas com credenciais corretas

fix(autenticação): corrigir bug no processo de reset de senha

docs: atualiza README com instruções de instalação

BREAKING CHANGE: altera API de autenticação
```
> Mudanças significativas devem ser indicadas com o prefixo `!` ou com `BREAKING CHANGE` no rodapé.

- **Enviar mensagem com `!`para chamar a atenção para uma mudança drástica**

```bash
feat!: enviar um e-mail ao cliente quando um produto for enviado
```

- **Enviar mensagem com `!` e rodapé BREAKING CHANGE**

```bash
chore!: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.
```
- **Mensagem de confirmação com corpo** 

```bash
feat(autenticacao): adicionar autenticação de usuário com JWT
#linha em branco
Implementada funcionalidade de login e registro de usuários usando JSON Web Tokens (JWT).
Adicionado middleware de validação de token para rotas protegidas.

BREAKING CHANGE: O sistema de autenticação foi refatorado.
```
>Rodapés e o corpo do commit não são sensíveis a maiúsculas e minúsculas, exceto `BREAKING CHANGE`, que deve ser em letras maiúsculas.
  

### Usar Conventional Commits traz benefícios como:

- Facilita a geração automática de changelogs;
- Determina automaticamente o versionamento semântico;
- Comunica o tipo das mudanças para colegas de equipe e usuários;
- Facilita a contribuição em projetos;
- Melhora a organização e legibilidade do histórico de commits.
