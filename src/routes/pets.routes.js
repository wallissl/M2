const  {Router} = require('express')

const petsRoutes = new Router();


// Criação do método delete

petsRoutes.delete("/:id", (request, response) => {

    const id = request.params.id
    
    conexao.query("DELETE FROM pets where id = $1", [id])

    response.status(204).json()
})

// Criação do método listar

petsRoutes.get("/", async (request, response) => {

    // Pegar uma informação do query params no get
    const dados = request.query
    console.log(dados)

    if(dados.nome){

   const pets = await conexao.query("SELECT * from pets where nome ilike $1", [`%${dados.nome}%`]) // ilike utilizado para buscar, caracter curinga

   response.status(200).json(pets.rows)
    } else{
        const pets = await conexao.query("SELECT * from pets");
        response.status(200).json(pets.rows)
    }
})


petsRoutes.post('/', async (request, response) =>{

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
