require('dotenv').config()
const express = require("express");
const cors = require("cors");
const routes = require('./routes/routes');
const connection = require('./database/connection');

const PORT_API = process.env.PORT_API // O último PORT_API é o nome da minha variável de ambinete lá no .env // O dotenv que possibilita essa funcionalidade.

class Server {
    constructor ( server = express() ) {
     
        this.middlewares(server)
        this.database()
        server.use(routes)
        this.initializeServer(server) 
    }

    async middlewares(app){
        console.log("Executando os middlewares...")
        app.use(cors())
        app.use(express.json())
        console.log("Middlewares inicializados!")
    }

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