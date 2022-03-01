# GoBarber API
API desenvolvida para o o Projeto GoBarber do Bootcamp GoStack da Rocketseat



## 🚀 Getting Started

+ Clone este repositório 
```jsx
git clone https://github.com/gabrielscordeiro/gobarber-api.git
```
+ Entre na pasta gobarber-api
```jsx
cd gobarber-api
```
+ Execute npm install para instalar as dependências 
```jsx
npm install
```

+ Ou se preferir usar o Yarn, use o comando
```jsx
yarn
```
+ Execute npm start para rodar o projeto em http://localhost:3333/
```jsx
npm start
```
ou
```jsx
yarn start
```

O projeto usa o banco de dados *Postgres*. O nome do banco criado é  `gostack_gobarber`. No projeto existe um arquivo chamado `sample.ormconfig.js`. Esse arquivo é um exemplo de arquivo de configuração do `TypeORM`. Renomeie esse arquivo para `ormconfig.js` inserindo as suas configurações para acesso ao banco de dados.

Para criar as tabelas do banco de dados, basta rodar as migrations usando o comando
```jsx
npm run typeorm migration:run
```
ou
```jsx
yarn typeorm migration:run
```