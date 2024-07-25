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

//Rota de vacinas
app.post('/vacinas', async (request, response) => {

    const dados = request.body

    if(!dados.nome || !dados.descricao || !dados.dose){
        return response.status(400).json({mensagem:'Nome, descrição e dose são obrigatorios'})
    }

    await conexao.query(`
        
        INSERT INTO vacinas
        (
        nome,
        descricao,
        dose
        )
        values
        (
            $1,
            $2,
            S3
        )
        `,[dados.nome, dados.descricao, dados.dose]);

        response.status(201).json({mensagem:'Vacina criada com sucesso'})
})


app.post('/pets', async (request, response) =>{

    try{
        const dados = request.body // Capturar as informações que vem do body
        console.log(dados) // Só para visualizar as informações enviadas no terminal
    
        if(!dados.nome || !dados.tipo || !dados.idade || !dados.raca){
            return response.status(400).json({mensagem:'O nome, o tipo, a idade e a raça são obrigatórios'})
        } // Utilizado para validar se as informações do nome chegaram e se estão corretas, caso não estejam o return faz o código parar por aqui mesmo.
    
        await conexao.query(
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
                $1,
                $2,
                $3,
                $4,
                $5,       
            )`, [dados.nome, dados.idade, dados.raca, dados.tipo, dados.responsavel]
        );
        
        response.status(201).json({mensagem: 'Criado com sucesso'}) // TESTAR ESSE CÓDIGO NO BANCO E POSTMAN

    }catch{
        response.status(500).json({mensagem: 'Não foi possível cadastrar o pet'})
    }
})



app.listen(3000, () => {
    console.log("Servidor online")
})