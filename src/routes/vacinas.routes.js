const {Router} = require('express')
const { Pool } = require('pg') // Importei o Pool novamente para testar nesse arquivo.
const vacinasRoutes = new Router()


const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password:'#',
    database:'api_pets'
})

//Rota de vacinas
vacinasRoutes.post('/', async (request, response) => {

    try {

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
            $3
        )
        `,[dados.nome, dados.descricao, dados.dose]);

        response.status(201).json({mensagem:'Vacina criada com sucesso'})

        
    } catch {
        
        response.status(500).json({mensagem: 'Não foi possível cadastrar a vacina'})

    }

    
})

module.exports = vacinasRoutes;

