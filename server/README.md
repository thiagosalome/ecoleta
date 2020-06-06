# Server

## Criando base do projeto

* Iniciar aplicação

  ```bash
  npm init -y
  ```

* Instalar dependências
  * express: ```npm install express```
  * @types/express: ```npm install @types/express -D```
  * ts-node: ```npm install ts-node -D```
  * ts-node-dev: ```npm install ts-node-dev -D``` (Fica observando alterações em ambiente de desenvolvimento)
  * typescript: ```npm install typescript -D```

* Criar arquivo de configuração do typescript

  ```bash
  npx tsc --init
  ```

* Criar arquivo server.ts
  * Criar uma rota GET /users com o express retornando um array de usuários

* Criar atalho de execução do server

  ```json
  "dev": "ts-node-dev src/server.ts"
  ```
