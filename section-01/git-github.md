# Git e GitHub

**Git**: Software de controle de versão de arquivos.

**GitHub**: Serviço de hospedagem (na cloud) para projetos que utilizam o Git. O GitHub oferece ferramentas para colaboração em projetos de software, facilitando a criação, revisão e compartilhamento de código.

## 1. Iniciar repositório Git

O comando `git init` informa ao Git onde estão os arquivos e qual diretório ele deve gerenciar. 

```bash
git init <diretorio>
```
- Inicializa o git no diretorio atual
```bash
git init . 
```
Após inicializar os arquivos ficam no estado de **UNTRACKED**, ou seja, se houver alterações nesses arquivos o git não vai fazer uma copia e substituir até que sejam adicionados no **STAGING**.

## 2. Tracked
Após adicionar um arquivo ao repositório usando o comando `git add`, ele entra no estado de **STAGED**. Os arquivos **TRACKED** são aqueles que o Git está monitorando.

- Coloca um arquivo no modo staged (prontos para o commit):
```bash
git add <file>
```
- Coloca todos os arquivos no modo staged:
```bash
git add .
```
- Para reverter (unstage) e remover arquivo da área de staging:

```bash
git rm --cached <file>
```
## 3. Commit
O comando `git commit` é utilizado para salvar as informações rastreadas no repositório. <br/>
**BOA PRÁTICA**: É recomendado usar a convenção de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) para padronizar as mensagens de commit.
```bash
git commit -m "mensagem do commit"
```

* Visualizar as alterações não comitadas no repositório:

```bash
git diff
```

* Passar do estado **working** diretamente para o **commit**, pulando a etapa de **staging**. OBS: Isso não é recomendado, poia deve ter certeza de que deseja incluir todas as alterações no commit:

```bash
git commit -a -m "mensagem do commit"
```
- Alterar a mensagem do último commit sem ter que realizar um novo commit:
```bash
git commmit -m "mensagem alterada" --amend
```

## 4. Estados do Git
O Git possui três estados principais para os arquivos em um repositório:

1. **Working Directory**
Estado onde os arquivos estão sendo modificados, podendo ser **untracked** (não rastreados) se novos ou **modified** (modificados) se já existiam.

1. **Staging Area**
Área intermediária onde as alterações são preparadas para o commit. Os arquivos são considerados **staged** (preparados). Usa o comando `git add` para mover arquivos do Working Directory para a Staging Area.

1. **Repository**
Estado final onde as alterações são permanentemente salvas no histórico do projeto. Os arquivos são considerados **committed** (confirmados). Usa o comando `git commit` para mover arquivos da Staging Area para o Repository.

## 5. Git Log

- Visualizar o histórico de commits:
```bash
git log
```
- Visualizar o histórico de commits resumidamente em uma linha:

```bash
git log --oneline

```
- Visualizar o histórico detalhadamente:

```bash
git log -p
```
## 6. Remover arquivo
- Mostra os comandos disponíveis:
```bash
git help rm
```

* Remove o arquivo do diretório:

```bash
git rm file.jpg
```
- Restaurar o arquivo removido, voltando os estados.
  
  Exemplo: Fazer o restore na parte de staged

```bash
  git restore --staged file.jpg
```
## 7. Git Reset

O comando `git reset` é usado para mover o status atual e desfazer alterações no repositório Git. Existem três tipos principais de git reset:

### 1. Git Reset Soft

- Move o HEAD para um commit específico, mantendo as alterações na área de staging.
- Permite criar um novo commit com as alterações desfeitas.
- Útil para reorganizar commits sem perder as modificações.
```bash
git reset --soft <id_commit>
```

### 2. Git Reset Mixed (Padrão)

- Move o HEAD para um commit específico.
- Desfaz as alterações na área de staging, mas mantém as modificações no working directory.
- As alterações ficam como "não staged", permitindo revisão antes de um novo commit.
```bash
git reset <id_commit>
```
### 3. Git Reset Hard

- Move o HEAD para um commit específico.
- Descarta todas as alterações, tanto da área de staging quanto do working directory.
- As alterações (commits após o novo HEAD) são permanentemente perdidas;

```bash
git reset --hard <id_commit>
```
## 8. Git revert

Cria um novo commit que reverte as alterações feitas em um commit anterior.

Ex: Se você realizou um commit para criar uma página, mas decidiu que não quer mais essa página, pode usar git revert para remover as alterações correspondentes a esse commit.

```bash
git revert <id_commit> 
```
## 9. Git alias
Permitem criar comandos personalizados para simplificar comandos frequentemente usados.

```bash
git config --global alias.<nome> "log --oneline"
```

```bash
git <nome>
```
## 10. Branch
Branch é um recurso do Git que permite criar linhas de desenvolvimento independentes dentro de um repositório.

```bash
git branch # Lista branches
git branch nome-da-branch # Cria uma nova branch
git checkout nome-da-branch # Muda de branch
git checkout -b nome-da-branch # Cria e muda para a nova branch
git merge -m "Merge da branch nome-da-branch para a main" nome-da-branch # Mescla uma branch com a branch atual
git branch -d nome-dabranch # Deletar uma branch
```

## 11. Merge
Utilizado para unir duas ou mais branches no Git.
* Se quero mesclar as mudanças na main: devo estar na branch `main`, pois o `git merge` é executado na branch onde deseja mesclar as mudanças.

```bash
git checkout main
git merge nome-da-branch -m "Merge da branch nome-da-branch para a main"
```

### Sincronizar com a branch `main` (opcional):

Se houve novas mudanças na branch `main` após o merge, por exemplo se outras pessoas também fizeram merges ou commits, é uma boa prática atualizar a **branch** com as última mudanças da **main** para evitar conflitos futuros.

```bash
git checkout <branch>
git pull origin main
```

## 12. Issues
**Issues** são uma ferramenta para rastrear tarefas, melhorias e bugs em projetos. Elas funcionam como um sistema de gerenciamento de problemas integrado ao repositório. 

Ex: Encontrei um erro no site, adiciono um issue para correção.

## 13. Release

São as versões de um software, que são disponibilizadas para uso por outras pessoas.

## 14. **Git Flow**

O git flow é um conjunto de extensões do Git que define um fluxo de trabalho estruturado, facilitando o gerenciamento de branches em projetos com múltiplas fases de desenvolvimento.
- **Branches Principais**:
    - `master/main`: Contém o código de produção estável.
    - `develop`: Contém o código de desenvolvimento.
- **Branches Temporárias**:
    - `feature`: Para desenvolvimento de novas funcionalidades.
    - `release`: Para preparar uma nova versão para ser lançada.
    - `hotfix`: Para correção de bugs críticos no código de produção.

OBS: Utilizando o git flow para finalizar uma **feature**, **release** ou **hotfix**, ele executa os merges automaticamente.

![fit flow](https://www.alura.com.br/artigos/assets/git-flow-o-que-e-como-quando-utilizar/imagem3.png)

## Comandos Git Flow

- Inicializa o Git Flow:
```bash
git flow init
```
- Inicializa o Git Flow com configurações padrão (pula as perguntas):
```bash
git flow init -d
```

- Criar uma feature a partir da `develop`:

```bash
git flow feature start nome-da-feature
```

- Finalizar e excluir a feature local e remotamente:

```bash
git flow feature finish nome-da-feature
```
- Finalizar a feature localmente, mas sem excluir a branch:
```bash
git flow feature finish nome-da-feature --keep
```
- Publique a branch no repositório remoto:
```bash
git push origin nome-da-feature
```
- Iniciar uma release para testes:

```bash
git flow release start 1.0 #numero da versão
```
- Finalizar a release e integrá-la a main e develop:

```bash
git flow release finish 1.0 
```

- Iniciar uma hotfix a partir da main para correções urgentes:

```bash
git flow hotflix start 1.1 #numero da versão
```

```bash
git flow hotflix finish 1.1 
```

- Fazer push das atualizações para o repositório remoto:

```bash
git push origin main # ou develop
```

```bash
git push --all # enviar todas as branch
```