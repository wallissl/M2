const express = require("express")
const {Pool} = require('pg');
const petsRoutes = require('./routes/pets.routes'); // Importando o arquivo da rota de pets
const vacinasRoutes = require("./routes/vacinas.routes"); //Importando o arquivo da rota de pets


const app = express();
app.use(express.json()) // Habilita o servidor a receber JSON

// Utilizando as rotas importadas
app.use('/pets', petsRoutes);
app.use('/vacinas', vacinasRoutes);

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



app.listen(3000, () => {
    console.log("Servidor online")
})