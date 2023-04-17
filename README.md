<h1 align="center">Project Management Dashboard <img src="./client/src/assets/logo.png" width="40" height="40"/></h1>
<p align="center">
    A simple project management dashboard having interactive and beautiful user interface built with <a href="https://www.mongodb.com/mern-stack" target="_blank">MERN</a> stack and 
    <a href="https://graphql.org/" target="_blank">GraphQL</a>
</p>

<br>

## How to run this project ?

\* you need to have mongodb up & running on your system. And copy paste the below commands

<br>

-   Clone this github repo

```bash
git clone https://github.com/uttamsutariya/graphql-with-mern.git
```

-   Go to project directory

```bash
cd graphql-with-mern
```

-   Install server dependencies

```bash
yarn install
```

-   Install client dependencies & make production build

```bash
cd client && yarn install && yarn build
```

-   create .env file in root directory of project and add

```bash
DB_URL=mongodb://127.0.0.1:27017/gql
```

-   After that run the following command from root of the project

```bash
yarn start
```

-   Now go to http://localhost:3030 to check running project
