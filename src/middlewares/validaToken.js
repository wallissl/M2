const {verify} = require('jsonwebtoken') // Para validar o token

function validaToken(request, response, next){
    
    try {
        const token = request.headers.authorization

    if(!token){
        return response
        .status(400)
        .json({mensasgem: 'Token não anexado'})

    } // Resposta caso queira barrar o usuário no Token

    const resultado = verify(token, process.env.SECRET_JWT) // Verificar se o token está correto.

    next()
    console.log(token) // Prosseguir caso o usuário tenha autorização.
        
    } catch (error) {
        
    }

}

module.exports = validaToken