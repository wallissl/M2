const Usuario = require("../models/Usuario");
const {compareSync} = require('bcryptjs');
const {sign} = require("jsonwebtoken");


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

        const token = sign({
            id: usuario.id
        },
        process.env.SECRET_JWT,
        {
            expiresIn: '1d'
        }
    )

        response.json({
        token: token, 
        nome: usuario.nome,
        mensagem: 'Login realizado'})
    }

}
module.exports = new LoginController()