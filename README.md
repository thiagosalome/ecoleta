<!-- Logo -->
<p align="center">
  <img src="./.github/logo.png" alt="Ecoleta" title="Ecoleta">
</p>

<!-- Badges -->
<p align="center">
  <img src="https://img.shields.io/badge/Next%20Level%20Week-1.0-34CB79" alt="Next Level Week - 1.0" title="Next Level Week - 1.0">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/thiagosalome/ecoleta?color=34CB79">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/thiagosalome/ecoleta?color=34CB79">
  <img alt="GitHub package.json version badge" src="https://img.shields.io/github/downloads/thiagosalome/ecoleta/total?color=34CB79">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-8257E5?color=34CB79">
</p>

<!-- Indice-->
<p align="center">
 <a href="#computer-sobre">Sobre</a> •
 <a href="#gear-funcionalidades">Funcionalidades</a> •
 <a href="#wrench-tecnologias-utilizadas">Tecnologias</a> •
 <a href="#art-layout">Layout</a> •  
 <a href="#movie_camera-preview">Preview</a> •
 <a href="#rocket-executando-o-projeto">Executando</a> •
 <a href="#memo-licença">Licença</a>
</p>

## :computer: Sobre

O **Ecoleta** foi criado com o intuito de ser um marketplace que ajuda pessoas a encontrarem pontos de coleta de resíduos de forma eficiente. Ele foi um projeto desenvolvido durante a **Next Level Week 1**, um evento organizado pela Rocketseat que busca no período de uma semana a criação de uma aplicação completa, englobando as partes web, mobile e server.

## :gear: Funcionalidades

### Web

- [x] Cadastro do ponto de coleta
  - [x] Imagens do estabelecimento
  - [x] Dados da entidade - Nome, E-mail e Whatsapp
  - [x] Endereço - Coordenadas, Número, Cidade, Estado
  - [x] Itens de coleta - Lâmpadas, Pilhas e Baterias, Papéis e Papelão, Resíduos Eletrônicos, Resíduos Orgânicos, Óleo de Cozinha

### Mobile

- [x] Acessar pontos de coletas cadastrados

- [x] Entrar em contato com a entidade através do E-mail ou WhatsApp

## :wrench: Tecnologias Utilizadas

<table>
  <tbody>
    <tr>
      <td align="center">
        <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/html.png" width='50' alt="HTML">
        <p>HTML</p>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/css.png" width='50' alt="CSS">
        <p>CSS</p>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/typescript.png" width='50' alt="TypeScript">
        <p>Typescript</p>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/react-base.png" width='50' alt="React">
        <p>React</p>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/react-native.png" width='50' alt="React Native">
        <p>React Native</p>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/node.png" width='50' alt="Node.js">
        <p>Node.js</p>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/sqlite.png" width='50' alt="SQLite">
        <p>SQLite</p>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/knex.png" width='50' alt="knex">
        <p>knex</p>
      </td>
    </tr>
  </tbody>
</table>

## :art: Layout

### Web - [Figma](https://www.figma.com/file/sE1kNJ5J9GkJUk6LpEFHjO/Ecoleta?node-id=0%3A1)

<img src="./.github/layout-web.png" alt="Layout Web" title="Layout Web">

### Mobile - [Figma](https://www.figma.com/file/sE1kNJ5J9GkJUk6LpEFHjO/Ecoleta?node-id=16118%3A0)

<img src="./.github/layout-mobile.png" alt="Layout Mobile" title="Layout Mobile">

## :movie_camera: Preview

### Web

<img src="./.github/preview-web.gif" alt="Preview Web" title="Preview Web">

### Mobile

<img width="200" src="./.github/preview-mobile.gif" alt="Preview Mobile" title="Preview Mobile">

## :rocket: Executando o projeto

### Pré-requisitos

Para executar o projeto é necessário ter instalado as seguintes ferramentas:

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href='https://git-scm.com/downloads' target='_blank'>
          <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/git.png" width='50' alt="React">
          <p>GIT</p>
        </a>
      </td>
      <td>
        <a href='https://git-scm.com/downloads' target='_blank'>
          <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/node.png" width='50' alt="React">
          <p>Node.js</p>
        </a>
      </td>
    </tr>
  </tbody>
</table>

### Rodando o servidor

**OBS:** Necessário estar rodando para executar a parte web e mobile

```bash
# Clone este repositório
$ git clone https://github.com/thiagosalome/ecoleta

# Acesse a pasta do projeto
$ cd ecoleta

# Vá para a pasta server
$ cd server

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3333 - acesse http://localhost:3333
```

### Rodando aplicação web

```bash
# Clone este repositório
$ git clone https://github.com/thiagosalome/ecoleta

# Acesse a pasta do projeto no seu terminal/cmd
$ cd ecoleta

# Vá para a pasta da aplicação Front End
$ cd web

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run start

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000
```

### Rodando aplicação mobile

**OBS:** Necessário ter o Expo instalado em seu dispositivo mobile ou no emulador.

```bash
# Clone este repositório
$ git clone https://github.com/thiagosalome/ecoleta

# Acesse a pasta do projeto no seu terminal/cmd
$ cd ecoleta

# Vá para a pasta da aplicação Front End
$ cd mobile

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run start

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000
```

## :memo: Licença

Este projeto esta sobe a licença [MIT](./LICENCE).
