const {Router}= require('express')
const responsaveisRoutes = require('./responsaveis.routes');
const cursosRoutes = require('./cursos.routes');
const usuariosRoutes = require('./usuarios.routes');
const permissoesRoutes = require('./permissoes.routes');
const LoginController = require('../controllers/LoginController');
/* const auth = require('../middlewares/validaToken'); */

const validaToken = require('../middlewares/validaToken');
const verificarPermissao = require('../middlewares/verificarPermissao');



const routes = new Router()

routes.use('/usuarios', usuariosRoutes);
routes.post('/login', LoginController.login);
routes.use('/permissoes', validaToken, permissoesRoutes);

/* routes.use(auth)  */// Tudo que estiver abaixo só será acessado se o usuário tiver o token.

routes.use('/responsaveis',validaToken, responsaveisRoutes);
routes.use('/cursos', validaToken, cursosRoutes);

module.exports = routes