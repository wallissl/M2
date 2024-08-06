const {Pool} = require('pg')

const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'senai',
    database: 'api_pets'
})

class PetController{

    async criar (request, response) {

        try{
            const dados = request.body // Capturar as informações que vem do body
            console.log(dados) // Só para visualizar as informações enviadas no terminal
        
            if(!dados.nome || !dados.tipo || !dados.idade || !dados.raca){
                return response.status(400).json({mensagem:'O nome, o tipo, a idade e a raça são obrigatórios'})
            } // Utilizado para validar se as informações do nome chegaram e se estão corretas, caso não estejam o return faz o código parar por aqui mesmo.
        
            const servico = await conexao.query(
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
                    $5       
                )returning *`, [dados.nome, dados.idade, dados.raca, dados.tipo, dados.responsavel]
            );
            
            response.status(201).json(servico.rows[0]) // TESTAR ESSE CÓDIGO NO BANCO E POSTMAN
    
        }catch{
            response.status(500).json({mensagem: 'Não foi possível cadastrar o pet'})
        }
    }

}

module.exports = new PetController()