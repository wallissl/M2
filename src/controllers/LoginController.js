const Usuario = require("../models/Usuario");
const {compareSync} = require('bcryptjs');


class LoginController{

    async login(request, response) {
        const dados = request.body

        if(!dados.email || !dados.password){
            return response
            .status(404)
            .json({mensagem: 'Email e senha são obrigatórios'})
        }

        const usuario = await Usuario.findOne({
            where:{
                email: dados.email,
            }
        })

        if(!usuario){
            return response
            .status(404)
            .json({mensagem:'Conta não encontrada'})
        }

        const senhaCorreta = compareSync(
            dados.password,
            usuario.password_hash
        )

        if(senhaCorreta == false){
            return response
            .status(404)
            .json({mensagem: 'Conta não encontradaa'})
        }

        response.json({mensagem: 'Login realizado'})
    }

}
module.exports = new LoginController()