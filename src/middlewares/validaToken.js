const {verify} = require('jsonwebtoken') // Para validar o token

function validaToken(request, response, next){
    
    try {
        const token = request.headers.authorization

    if(!token){
        return response
        .status(400)
        .json({mensasgem: 'Token não anexado'})

    } // Resposta caso queira barrar o usuário no Token

    const jwt = token.split(" ") // Dividir uma String, nesse caso separamos o nome Bearer do token em si pelo espaço.

    //     const jwt = token.split(" ")[1]; Caso queira mandar ja desestruturado

    const resultado = verify(jwt[1], process.env.SECRET_JWT) // Verificar se o token está correto.
    console.log(resultado)

    request.usuarioId = resultado.id

    next()
    console.log(token) // Prosseguir caso o usuário tenha autorização.
        
    } catch (error) {
        if(error.message === "jwt malformed" || "jwt expired"){
            response.status(401).json({ mensagem: 'O Token está inválido ou expirado!'})
        }else {
            response.status(500).json({mensagem: 'A requisição falhou'})
        }
       
    }

}

module.exports = validaToken