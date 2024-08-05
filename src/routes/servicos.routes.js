const {Router} = require('express') 
const {Pool} = require('pg')

const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '#',
    database: 'api_pets'
})

const servicosRoutes = new Router();
// Aqui vem a implementação da minha rota.

servicosRoutes.post("/", async (request, response) => {
    
    try {
        const dados = request.body

    if(!dados.nome || !dados.preco && dados.preco !== 0){
        return response.status(400).json({
            mensagem: 'Nome e preço são obrigatórios'
        })
    }
    
    const servico = await conexao.query(`
        INSERT into servicos
        (nome, descricao, preco)
        values
        ($1, $2, $3)
        returning *`
        ,
        [dados.nome, dados.descricao, dados.preco]
    )
    response.status(201).json(servico.rows[0])
    // É possível retornar o objeto criado utilizando o returning junto com o servicos.rows(nesse caso) depois que o objeto foi criado / Nesse caso também é possível só retornar uma informação trocando o * por nome por exemplo.
        
    } catch {
        response.status(500).json({mensagem: 'Não foi possível cadastrar o serviço'})
    }    
    
})


module.exports = servicosRoutes