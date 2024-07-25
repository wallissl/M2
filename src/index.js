const express = require("express")
const {Pool} = require('pg');

const app = express();
app.use(express.json()) // Habilita o servidor a receber JSON

// Chamar a variável que vem do Pool para conexão com o banco de dados
const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password:'#',
    database:'api_pets'
})


app.get('/bemvindo', (request, response) => {
    response.send("Bem vindo usuário")
})

app.post('/pets', (request, response) =>{
    const dados = request.body // Capturar as informações que vem do body
    console.log(dados) // Só para visualizar as informações enviadas no terminal

    conexao.query(
        `INSERT INTO pets
        (
        nome,
        idade,
        raca,
        tipo,
        responsavel
        )
        values
        (
            '${dados.nome}',
            '${dados.idade}',
            '${dados.raca}',
            '${dados.tipo}',
            '${dados.responsavel}'        
        )`
    );
    
    response.send('Entrei aqui')
})



app.listen(3000, () => {
    console.log("Servidor online")
})