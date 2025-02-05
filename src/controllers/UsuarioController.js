const Usuario = require("../models/Usuario");

  // regex (expressão regular) para validar um email
  const regexEmail = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

class UsuarioController {
    async criarConta(request, response){
        try {

            const dados = request.body

        // Validação de dados
        if(!dados.nome){
            return response.status(400).json({mensagem: 'O nome é obrigatório'})
        }

        if(regexEmail.test(dados.email) === false){
            return response
            .status(400).json({mensagem: 'O email está no formato inválido'})
        }

        if(!(dados.password?.length >= 8 && dados.password?.length <= 16)) {
            return response.status(400).json({mensagem: "A senha deve ter entre 8 e 16 digitos"})
        }

        const usuarioExistente = await Usuario.findOne({
            where:{
                email: dados.email
            }
        })

        if(usuarioExistente){
            return response.status(409).json({mensagem: 'Já existe uma conta com esse email'})
        }

        const usuario = await Usuario.create({
            ...dados,
            password_hash: dados.password
        })

        response.status(201).json({usuario})
        }            
        catch (error) {
            console.log(error)
              response.status(500).json({mensagem: 'Houve um erro ao criar conta'})  
        }
    }  
}

module.exports = new UsuarioController()