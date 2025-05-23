# 🐞 BugBank Test Automation 🏦

Bem-vindo ao **BugBank Test Automation**! Este repositório contém testes automatizados para o BugBank, utilizando **Cypress** com **Cucumber** para automação de cenários em formato Gherkin. 🚀 Aqui avaliamos funcionalidades, como transferência entre contas, login, e muito mais!

---

## 🗂 Estrutura de Testes
Os nossos testes automatizados estão organizados por funcionalidades dentro da pasta `e2e`. Aqui estão os principais aspectos cobertos:

- **Login e Cadastro** 👤
- **Transferências Bancárias** 💸
- **Validação de Alertas** 🔔
- **Saque e Limites** 🏧

---

## 🛠 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:
- **Node.js**: Versão 18 ou superior.
- **npm**: Gerenciador de pacotes do Node.js.

---

## ⚙️ Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone https://github.com/lari-bs/bugbank-casas-bahia.git
   cd bugbank-casas-bahia
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Para configurar variáveis específicas, edite o arquivo [`cypress.config.js`](cypress.config.js).

---

## 🚀 Como Executar os Testes

### 1️⃣ Abrir o Cypress no Modo Interativo
Use o modo interativo para visualizar os testes diretamente no navegador:
   ```bash
   npm run cypress:open
   ```

### 2️⃣ Executar os Testes no Modo Headless
Execute todos os testes no modo headless (sem interface gráfica) e gere relatórios automaticamente:
   ```bash
   npm run cypress:run
   ```

### 3️⃣ Executar cenários por **Tags Cucumber**
É possível executar cenários específicos utilizando **tags** definidas no arquivo `.feature` com o seguinte comando:
   ```bash
   npm run cypress:tags
   ```
   > Exemplo: 
   ```bash
   npx cypress run -e TAGS=@login
   ```

---

## 🤖 Execução no CI/CD
Os testes do Cypress são automaticamente executados pelo **GitHub Actions** nos seguintes cenários:
- **Pull Requests** abertos.
- **Commits** enviados para qualquer branch.
- Agendamento diário de segunda a sexta-feira às 8:00 (UTC).

Os relatórios gerados estão disponíveis em:
👉 **[Link para os relatórios no GitHub Pages](https://lari-bs.github.io/bugbank-casas-bahia/)**.

---

## 📊 Relatórios de Testes

Após a execução dos testes no modo headless, os relatórios serão gerados automaticamente em:
- 📂 `output/screenshots/`: Capturas de tela dos testes com falha.
- 📂 `output/reports/`: Relatórios em formato **HTML**.

Os relatórios incluem informações detalhadas das execuções, como cenários executados, passos concluídos, falhas, tempo total e capturas de tela integradas.

---

## 🔑 Funcionalidades Testadas

### ✅ Login e Cadastro
- Validação de credenciais corretas/incorretas.
- Alerta de erros ao inserir dados inválidos.

### ✅ Transferência de Valores
- Transferência de valores entre contas existentes. 💸
- Erro ao tentar transferir para contas inexistentes.

### ✅ Operações Bancárias
- Verificação de saque com limite excedido. 🏧
- Testes de saldo inicial e final. ➕➖

---

## 🌐 Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/) 🌲
- [Cucumber](https://www.npmjs.com/package/cypress-cucumber-preprocessor/) 🥒 (Para automação em padrão Gherkin)
- [Day.js](https://day.js.org/) 📆 (Para controle de datas e horários nos relatórios)
- [Mochawesome](https://www.npmjs.com/package/cypress-mochawesome-reporter) 📝 (Geração de relatórios incríveis)
- [GitHub Actions](https://github.com/features/actions) ⚙️ (Execução de testes automatizados no CI/CD)
- [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) 🌐 (Publicação de relatórios no GitHub Pages)

---

## 📂 Estrutura do Projeto
   ```
bugbank-casas-bahia
├── cypress/
│   ├── e2e/                 # Testes End-to-End
│   │   ├── login.feature     # Cenários de Login
│   │   ├── transfer.feature  # Cenários de Transferências
│   │   ├── withdraw.feature  # Cenários de Saques
│   ├── fixtures/             
│   │   ├── texts.json         # Mensagens e alertas esperados
│   │   └── users.json         # Usuários cadastrados no sistema
│   ├── support/              
│   │   ├── step_definitions/  # Definições de passos do Cucumber
│   │   │   ├── login.js        # Steps relacionados ao Login
│   │   │   ├── transfer.js     # Steps relacionados às Transferências
│   │   │   ├── withdraw.js     # Steps relacionados aos Saques
│   │   ├── commands.js         # Definição de comandos Cypress personalizados
│   │   └── e2e.js              # Configuração global dos testes
├── output/                   # Relatórios gerados com Cypress Mochawesome
│   ├── screenshots/          # Capturas geradas em falhas
│   ├── reports/              # Relatórios das execuções
├── cypress.config.js         # Configurações do Cypress
├── package.json              # Dependências e scripts do projeto
└── README.md                 # Documentação do Projeto
   ```

---

## 🛡️ Boas Práticas

- **Manter separação de responsabilidades** 🛠: Cada funcionalidade testada tem seu próprio arquivo na pasta `e2e`.
- **Utilizar mocks e fixtures** 🧸: Para dados como usuários ou mensagens esperadas.
- **Relatórios detalhados** 📊: Capturas de tela integradas e relatórios em HTML ajudam na análise de falhas.

---

## 🤝 Contribuição

Contribuições são **bem-vindas**! 💖 Sinta-se à vontade para abrir issues ou pull requests para melhorias ou novos testes.

---

## 📧 Contato

Em caso de dúvidas ou sugestões:
- **Autor**: Larissa Barbosa
---

💡 **Dica**: Testar é um hábito contínuo! Mantenha os testes atualizados para evitar bugs inesperados. 🤓