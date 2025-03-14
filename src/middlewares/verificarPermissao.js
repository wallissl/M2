const { request } = require("express");

const verificarPermissao = (permissoesRequeridas) => {
  return (request, response, next) => {
    try{
        const { usuarioId } = request
        const usuario =  Usuario.findByPk(usuarioId, {
            include: {
                model: Permissao,
                through: {
                    attributes: []
                }
            }
        });

        // Pega todas as permissoes atribuidas ao usuario e coloca na variável permissoesUsuario
        const permissoesUsuario = usuario.permissoes.map(p => p.descricao); // [criarCurso, 'deletarCurso']
        
        const temPermissao = permissoesRequeridas.every(permissao => permissoesUsuario.includes(permissao));

        if(!temPermissao){
            return response.status(401).json({
                mensagem: "Usuário não tem uma ou mais permissões"
            })
        }

        next();
        } catch (error) {
            response.status(500).json({
                mensagem: "Houve um erro ao verificar as permissões"
            })
    
        }
    }
}

module.exports = verificarPermissao;