/* require('dotenv').config() */ // Esse arquivo foi parar na pasta de configurações.
const express = require("express");
const cors = require("cors");
const routes = require('./routes/routes');
const connection = require('./database/connection');

const PORT_API = process.env.PORT_API // O último PORT_API é o nome da minha variável de ambinete lá no .env // O dotenv que possibilita essa funcionalidade.

class Server {
    constructor ( server = express() ) {
     
        this.middlewares(server) // Aplica os middlewares
        this.database() // Inicia o banco de dados
        server.use(routes) // Liga as rotas - Registra no express
        this.initializeServer(server) // Inicia o servidor
    }

    async middlewares(app){ 
        console.log("Executando os middlewares...")
        app.use(cors()) // Para trabalhar com chamadas https de outros ips 
        app.use(express.json()) // Para trabalhar com json
        console.log("Middlewares inicializados!")
    } // São funções que ficam entre a requisição e a resposta.

    async database(){
        try {
            await connection.authenticate()
            console.log("Conexão com o banco de dados estabelecida com sucesso")
        } catch (error) {
            console.log("Erro ao conectar com o banco de dados!")
            console.log(error)
            
        }
    }

    async initializeServer(app){
        app.listen(PORT_API, () => {
            console.log(`Servidor conectado na porta ${PORT_API}`)
        })
    }
}

module.exports = {Server}



/* const app = express();
app.use(express.json()) // Habilita o servidor a receber JSON


app.listen(PORT_API, () => {
    console.log("Servidor online")
}) */