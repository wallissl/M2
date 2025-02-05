const {Router, response} = require('express');
const Responsavel = require('../models/Responsavel');

const responsaveisRoutes = new Router();

responsaveisRoutes.post('/', async (request, response) => {

    try {
        const {nome, idade, sexo, email, senha} = request.body;

    const responsavel = await Responsavel.create({
        nome: dados.nome,
        idade: dados.idade,
        sexo: dados.sexo,
        email: dados.email,
        senha: dados.senha
    });

    return response.json(responsavel);
        
    } catch (error) {
        response.status(500).send("Não foi possível cadastrar o responsável");
    }

    
})

// Get de todos os dados
responsaveisRoutes.get('/', async (request, response) => {
    const responsaveis = await Responsavel.findAll();

    return response.json(responsaveis);
})

// Get de um dado específico

responsaveisRoutes.get('/:id', async (request, response) => {

    const {responsavelID} = request.params.id;
    const responsavel = await Responsavel.findByPk(responsavelID);

    if(!responsavel){
        return response.status(404).send("Responsável não encontrado");
    }

    return response.json(responsavel);
})

// Fazer update

responsaveisRoutes.put('/:id', async (request, response) => {

    const {responsavelID} = request.params.id;
    const responsavel = await Responsavel.findByPk(responsavelID);

    if(!responsavel){
        return response.status(404).send("Responsável não encontrado");
    }

    const {nome, idade, sexo, email, senha} = request.body;

    responsavel.nome = nome;
    responsavel.idade = idade;
    responsavel.sexo = sexo;
    responsavel.email = email;
    responsavel.senha = senha;

    await responsavel.save();

    return response.json(responsavel);
    
})

// Realizar delete

responsaveisRoutes.delete('/:id', async (request, response) => {

    const {responsavelID} = request.params.id;
    const responsavel = await Responsavel.findByPk(responsavelID);

    if(!responsavel){
        return response.status(404).send("Responsável não encontrado");
    }

    await responsavel.destroy();

    return response.status(204).send();
    
})



module.exports = responsaveisRoutes;