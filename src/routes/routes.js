const {Router}= require('express')
const responsaveisRoutes = require('./responsaveis.routes');
const cursosRoutes = require('./cursos.routes');
const usuariosRoutes = require('./usuarios.routes');
const LoginController = require('../controllers/LoginController');
const permissoesRoutes = require('./permissoes.routes');
const validaToken = require('../middlewares/validaToken');


/* const auth = require('../middlewares/validaToken'); */


/* const verificarPermissao = require('../middlewares/verificarPermissao'); */



const routes = new Router()

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc.swagger.json');
routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


routes.use('/usuarios', usuariosRoutes);
routes.post('/login', LoginController.login 
     /*
    
    #swagger.tags = ['Usuarios'],
    #swagger.description = 'Endpoint para logar um usuário',
    #swagger.parameters['loginUsuario'] = {
      in: 'body',
      description: 'Login do usuário',
      required: true,
      schema: {
        $email: "teste@gmail.com",
        $password: "teste123",       
      }
    },   
    
    */
);

routes.use('/permissoes', validaToken, permissoesRoutes);

/* routes.use(auth)  */// Tudo que estiver abaixo só será acessado se o usuário tiver o token.

routes.use('/responsaveis',validaToken, responsaveisRoutes);
routes.use('/cursos', validaToken, cursosRoutes);

module.exports = routes