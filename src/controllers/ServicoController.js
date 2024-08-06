

const {Pool} = require('pg')

const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'senai',
    database: 'api_pets'
})

class ServicoController {


    async listarTodos(request, response){

        // Buscar através do query params

        const query = request.query
        
        if(query.filtro) {

            const servicos = await conexao.query(`
                select * from servicos
                where nome ilike $1 
                or descricao ilike $1
                or cast(preco as varchar) ilike $1 
                `, [`%${query.filtro}%`]) // cast utilizado para converter a coluna para string para poder buscar o filtro do número procurado.
            response.json(servicos.rows)

        }else{
            //Buscar todos
        const servicos = await conexao.query("select * from servicos");
        response.json(servicos.rows)
        }

        

    }


    async criar(request, response){


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
    } 
}

module.exports = new ServicoController()