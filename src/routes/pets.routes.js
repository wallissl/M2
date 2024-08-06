const  {Router} = require('express');
const PetController = require('../controllers/PetController');

const { Pool } = require('pg') // Importei o Pool novamente para testar nesse arquivo.

const petsRoutes = new Router();

// Chamar a variável que vem do Pool para conexão com o banco de dados
const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password:'senai',
    database:'api_pets'
})

// Criação do método de atualizar

petsRoutes.put("/:id", async (request, response) => {
    const dados = request.body; // pegar o dados do body
    const id = request.params.id // dados do id params

    const dadosDoPet = await conexao.query('SELECT * FROM pets where id = $1', [id]) // Pegar todos os dados do banco para verificar o que já existe na hora de atualizar.
    
    conexao.query(`UPDATE pets
        set nome = $1,
        idade = $2,
        raca = $3,
        tipo = $4,
        responsavel = $5
        where id = $6 `, [
            dados.nome || dadosDoPet.rows[0].nome,
            dados.idade || dadosDoPet.rows[0].idade,
            dados.raca || dadosDoPet.rows[0].raca,
            dados.tipo || dadosDoPet.rows[0].tipo,
            dados.responsavel || dadosDoPet.rows[0].responsavel,
             id
        ]
    )

    response.json({mensagem: 'Atualizado com sucesso'})
})

// Criação do método de listar apenas 1

petsRoutes.get('/:id' , async (request, response) => {

    try {
        const id = request.params.id

    const pet = await conexao.query("SELECT * from pets where id = $1", [id])

    if(pet.rows.length === 0){
        return response.status(404).json({mensagem: 'Não foi possível encontrar um pet com esse ID.'})
    }

    response.json(pet.rows[0])
        
    } catch {
        response.status(500).json({mensagem: 'Não foi possível localizar o item'})
    }
    
})


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


petsRoutes.post("/", PetController.criar)

module.exports = petsRoutes
