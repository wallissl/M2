

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

        try {
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
        } catch {
            response.status(500).json({mensagem: 'Não foi possível listar os serviços'})
        }
    }

    async listarUm (request, response){

        try {

        // Listar um
        const id = request.params.id

        const servico = await conexao.query(`
            select * from servicos
            where id = $1
            `, [id]
        )

        if(servico.rowCount === 0){
            return response.status(404).json({mensagem: 'Não foi encontrado o serviço'})
        }

        response.json(servico.rows[0])

        }catch{

            response.status(500).json({mensagem: 'Não foi possível listar o serviço'})      
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

    async deletar(request, response){
        try {
            const id = request.params.id
           const servico = await conexao.query(`
                DELETE FROM servicos
                where id = $1`, [id])

                if(servico.rowCount == 0){
                    return response.status(404).json({mensagem: 'Informação não encontrada pelo ID'})
                }

                response.status(204).json()
        } catch{
            response.status(500).json({mensagem: 'Não foi possível deletar o serviço'})
        }
    }

    async atualizar(request, response){
        
        try {
            const dados = request.body
            const id = request.params.id

            const dadosDoServico = await conexao.query(`
                    select * from servicos
                    where id = $1
                `, [id])

            await conexao.query(`
                    update servicos
                    set nome = $1,
                    descricao = $2,
                    preco = $3
                    where id =$4
                `, [dados.nome || dadosDoServico.rows[0].nome,
                    dados.descricao || dadosDoServico.rows[0].descricao,
                    dados.preco || dadosDoServico.rows[0].preco,
                    id])

                response.json({mensagem: 'Atualizado com sucesso'})

        } catch (error) {
            response.status(500).json({mensagem: 'Não foi possível atualizar o serviço'})
        }

    }
}

module.exports = new ServicoController()