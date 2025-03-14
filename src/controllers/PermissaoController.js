const Permissao = require('../models/Permissao');

// Feito para testar.

class PermissaoController {
  
// Método criar
async criar(request, response) {

        try {
        
            const descricao = request.body.descricao;
            // Aqui poderá entrar a parte de validação

            const permissao = await Permissao.create(descricao);
            return response.status(201).json(permissao)

        } catch (error) {
            response.status(500).json({
                mensagem: "Houve um erro ao cadastrar a permissão"
            })
        }
    }

// Método Listar

async listar(request, response) {

    try {

        const permissoes = await Permissao.findAll();
        response.json(permissoes)

    } catch (error) {
        response.status(500).json({
            mensagem: "Houve um erro ao listar as permissões"
        })
    }
} 

// Método delete
async deletar(request, response){

    try {

        const id = request.params.id;
        const permissao = await permissao.findByPk(id);

        if(!permissao){
            return response.status(404).json({
                mensagem: "Não foi encontrado uma permissão com esse ID"
            })
        }

        await permissao.destroy();

        response.status(204).json()
        
    } catch (error) {
        response.status(500).json({
            mensagem: "Não foi possível deletar a permissão"
        })
    }
}

}

module.exorts = new PermissaoController();