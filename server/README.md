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
  "dev": "ts-node-dev --ignore-watch node_modules src/server.ts"
  ```

---

## Configurando arquivo server.ts

```ts
import express from 'express'
import routes from './routes'

const app = express()

app.user(express.json())
app.use(routes)

app.listen(3333)

```

---

## Qual bancos de dados utilizar

SQL: Postgres, MySQL, SQLite, SQL Server
NoSQL: MogoDB, CouchDB

Utilizaremos o SQLite porque não precisaremos instalar nada na nossa máquina.

## Knex

É uma biblioteca que permite trabalhar com banco de dados SQL com uma linguagem unificada para todos os bancos.

Com ele escremos as queries em formato de JavaScript.

### Benefícios

* Conseguimos adaptar para qualquer banco de dados
* Ganhamos um Intellisense na IDE

---

## Configurando conexão com o banco

* Instalar knex

  ```bash
  npm install knex
  ```

* Instalar sqlite

  ```bash
  npm install sqlite3
  ```

* Criar arquivo /database/connection.ts

  ```ts
    import knex from 'knex'
    import path from 'path'

    const connection = knex({
      client: 'sqlite3',
      connection: {
        filename: path.resolve(__dirname, 'database.sqlite') // Padroniza o caminho de acordo com o sistema operacional.
      },
      useNullAsDefault: true,
    })

    export default connection;
  ```

  **OBS:** O ```__dirname``` sempre retorna o caminho do arquivo que está chamando ele

---

## Identificando as entidades da minha aplicação

* points: Pontos de coleta
  * image
  * name
  * email
  * wahtsapp
  * latitude
  * longitude
  * city
  * uf
* items: Itens para coleta (Lâmpadas, Pilhas e Baterias, Papéis e Papelão, etc)
  * title
  * image
* point_items: Relacionamento Muitos para Muitos
  * point_id: Um ponto de coleta tem vários itens
  * item_id: Um item pode ser coletado em vários pontos de coleta

---

## Migrations

As migrations permitem você fazer um controle de versão do seu banco de dados. Ajuda muito quando um projeto envolve mais de um desenvolvedor.

* Criar as seguintes migrations
  * 00_create_points.ts

    ```ts
    import Knex from 'knex'

    export async function up(knex: Knex) {
      return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
      })
    }

    export async function down(knex, Knex) {
      return knex.schema.dropTable('points')
    }

    ```

  * 01_create_items.ts

    ```ts
    import Knex from 'knex'

    export async function up(knex: Knex) {
      return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
      })
    }

    export async function down(knex, Knex) {
      return knex.schema.dropTable('items')
    }

    ```

  * 02_create_point_items.ts

    ```ts
    import Knex from 'knex'

    export async function up(knex: Knex) {
      return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();
        table.integer('point_id')
          .notNullable()
          .references('id').inTable('points'); // Cria uma referência ao campo id da tabela points
        table.integer('item_id')
          .notNullable()
          .references('id').inTable('items'); // Cria uma referência ao campo id da tabela items
      })
    }

    export async function down(knex, Knex) {
      return knex.schema.dropTable('point_items')
    }

    ```

---

### Executando as migrations

* Criar na raiz do projeto o arquivo knexfile.ts

  ```ts
    import path from 'path'

    module.exports = {
      client: 'sqlite3',
      connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite') // Padroniza o caminho de acordo com o sistema operacional.
      },
      migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
      },
      useNullAsDefault: true,
    }
  ```

* Executar o seguinte comando para gerar migrations

  ```bash
  npx knex --knexfile knexfile.ts migrate:latest
  ```

  **Dica:** Adicionar um atalho (knex:migrate) no package.json para esse comando poder rodar.

**OBS:** Para poder visualizar o banco de dados basta baixar a extensão SQLite no VSCode.

---

## Funcionalidades da aplicação

* Cadastro de um ponto de coleta
* Lista os itens de coleta
* Listar pontos (filtro por estado/cidade/items)
* Listar um um ponto de coleta específico

---

## Criando os itens de coleta

Como os itens de coleta não são cadastrados pelos usuários, nós iremos utilizar os seeds.

Criar pasta seeds dentro de /database/seeds

* create_items.ts

```ts
import Knex from 'knex'

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Lâmpadas', image: 'lampadas.svg' },
    { title: 'Pilhas e Baterias', image: 'baterias.svg' },
    { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
    { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
    { title: 'Resíduos Orgânicos', image: 'organicos.svg' },
    { title: 'Óleo de Cozinha', image: 'oleo.svg' },
  ])
}

```

No arquivo knextfile.ts adicionar

  ```ts
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
  ```

* Executar o seguinte comando para gerar seeds

  ```bash
  npx knex --knexfile knexfile.ts seed:run
  ```

  **Dica:** Adicionar um atalho (knex:seed) no package.json para esse comando poder rodar.

---

## Configurando caminho das imagens

Criar uma pasta uploads/ na raiz do projeto e passar todas as imagens

No arquivo server.ts

```ts
  app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
```

---

## Criando rotas

Rota para listagem de itens

```ts
  import knex from './database/connection'

  routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*' )
  
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`
      }
    })

    return response.json(serializedItems)
  })

```

Cadastro de pontos de coleta

```ts

  routes.post('/points', async (request, response) => {
    // Pegando os dados do request
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;

    const trx = await knex.transaction(); // Permite o rollback das queries caso uma dê problema

    const point = {
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }

    // Inserindo os dados
    const insertedIds = await trx('points').insert(point)

    const point_id = insertedIds[0]; // Pegando o id do point

    // Montando um array de point_items para cadastrar
    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id
      }
    })

    await trx('point_items').insert(pointItems)

    await trx.commit() // Faz os inserts na base de dados

    return response.json({
      id: point_id,
      ...point
    })
  })

```

---

## Reestruturando projeto

* Criar PointsCrontroller e mover o método de criação de points para ele

  ```ts
  import { Request, Response } from 'express'
  import knex from './database/connection'

  class PointsController {
    async create(request: Request, response: Response) {
      [...]
    }
  }

  ```

  No routes.ts

  ```ts
  import PointsController from './controllers/PointsController'

  const pointsController = new PointsController()
  routes.post('/points', pointsController.create)
  ```

* Criar ItemsCrontroller e mover o método de criação de points para ele

  ```ts
  import { Request, Response } from 'express'
  import knex from './database/connection'

  class ItemsController {
    async index(request: Request, response: Response) {
      [...]
    }
  }

  ```

  No routes.ts

  ```ts
  import ItemsController from './controllers/ItemsController'

  const itemsController = new ItemsController()
  routes.get('/items', itemsController.index)
  ```

Os métodos padrões dos Controllers são:

* index: Listagem de todos os itens
* show: Listagem de um item específico
* create: Criação de um item
* update: Atualização de um item
* delete: Remoção de um item

---

## Continuando criação das rotas

Listagem de um ponto de coleta específico (Dentro do PointsController)

  ```ts
  import { Request, Response } from 'express'
  import knex from './database/connection'

  class PointsController {
    async show(request: Request, response: Response) {
      const { id } = request.params

      const point = await knex('points').where('id', id).first(); // O first() faz com que pegue apenas a primeira ocorrência

      if(!point) {
        return response.status(400).json({ message: 'Point not found' })
      }

      const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title')

      return response.json({ point, items })
    }

    [...]
  }

  ```

Listagem de pontos por filtro de estado/cidade/items (Dentro do PointsController)

  ```ts
  import { Request, Response } from 'express'
  import knex from './database/connection'

  class PointsController {
    async index(request: Request, response: Response) {
      const { city, uf, items } = request.query

      const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()))

      const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', city)
        .where('uf', uf)
        .distinct() // Para selecionar resultados específicos
        .select('points.*')

      return response.json(points)
    }
    [...]
  }
  ```

## Adicionando CORS

O CORS define quais endereços externos vão ter acesso a nossa aplicação.

Instalar o módulo de cors

```bash
npm install cors
npm install @types/cors -D
```

Adicionar no server.ts

```ts
app.use(cors())
```
