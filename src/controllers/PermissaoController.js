const Permissao = require('../models/Permissao');
const Usuario = require('../models/Usuario');
// Feito para testar.

class PermissaoController {
  
// Método criar
async criar(request, response) {

        try {
        
            const descricao = request.body;
            // Aqui poderá entrar a parte de validação

            const permissao = await Permissao.create(descricao);
            response.status(201).json(permissao)

        } catch (error) {
            console.log(error)
            response.status(500).json({
                mensagem: "Houve um erro ao cadastrar a permissão"
            })
        }
    }

// Método Listar

async listarTodos(request, response) {

    try {

      /*   const descricao = request.body.descricao; */

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
        const permissao = await Permissao.findByPk(id);

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

async atribuirPermissao(request, response){

    try {

        const { usuarioId, permissaoId } = request.body;

        const usuario = await Usuario.findByPk(usuarioId);
        const permissao = await Permissao.findByPk(permissaoId);

        if(!usuario || !permissao){
            return response.status(404).json({
                mensagem: "Usuário ou permissão não encontrados"
            })
        }

        await usuario.addPermissao(permissao);

        response.status(204).json()

    } catch (error) {
            response.status(500).json({
                mensagem: "Houve um erro ao atribuir permissão"
            })
        }
    }

}

module.exports = new PermissaoController();