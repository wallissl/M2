const Curso = require("../models/Curso");

class CursoController {

    // Método buscar todos
    async buscarTodos(request, response){

        try {

            const cursos = await Curso.findAll();
            response.json(cursos)
            
        } catch (error) {
            response.status(500).json({
                mensagem: "Não foi possível localizar os cursos"
            })
        }
    }

    // Método atualizar

    async atualizar(request, response){

        try {
            
            const id = request.params.id;
            const dados = request.body;

            const curso = await Curso.findByPk(id);

            if(!curso){
                return response.status(404).json({
                    mensagem: "Não foi encontrado um curso com esse ID"
                })
            }

            curso.nome = dados.nome;
            curso.duracao = dados.duracao

            // Efetivar a atualização
            await curso.save()

            response.json(curso)

        } catch (error) {
            console.log(error)
            response.status(500).json({
                mensagem: "Não foi possível atualizar o curso"
            })
        }

    }

    // Método delete
    async deletar(request, response){

        try {

            const id = request.params.id;
            const curso = await Curso.findByPk(id);

            if(!curso){
                return response.status(404).json({
                    mensagem: "Não foi encontrado um curso com esse ID"
                })
            }

            await curso.destroy();

            response.status(204).json()
            
        } catch (error) {
            response.status(500).json({
                mensagem: "Não foi possível deletar o curso"
            })
        }
    }

    // Método criar
    async criar(request, response) {

        try {
            
            console.log(request.userId);
            const dados = request.body; 
            // Aqui poderá entrar a parte de validação
            const curso = await Curso.create(dados);
            response.status(201).json(curso);


        } catch (error) {
            response.status(500).json({
                mensagem: "Não foi possível criar o curso"
            })
        }

    }

    // Método buscar um
    
    async buscarUm(request, response){

        try {

            const id = request.params.id;
        const curso = await Curso.findByPk(id);

        if(!curso){
            return response.status(404).json({
                mensagem: "Não foi encontrado um curso com esse ID"
            })
        }

        response.json(curso);

        } catch (error) {
            response.status(500).json({
                mensagem: "Não foi possível criar o curso"
            })
        }
        
    }

    //buscar por parâmetro

    async listarPorParametro(request, response){

        try {
            
            const {nome} = request.query;

            const cursos = await Curso.findAll({
                where: {
                    nome: nome
                }
            });

            response.json(cursos);

        } catch (error) {
            response.status(500).json({
                mensagem: "Não foi possível localizar os cursos"
            })
        }
    }



}

module.exports = new CursoController()