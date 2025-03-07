const {Router}= require('express')
const responsaveisRoutes = require('./responsaveis.routes');
const cursosRoutes = require('./cursos.routes');
const usuariosRoutes = require('./usuarios.routes');
const LoginController = require('../controllers/LoginController');
const auth = require('../middlewares/validaToken');


const routes = new Router()

routes.use('/usuarios', usuariosRoutes);
routes.post('/login', LoginController.login);

routes.use(auth) // Tudo que estiver abaixo só será acessado se o usuário tiver o token.
routes.use('/responsaveis', responsaveisRoutes);
routes.use('/cursos', cursosRoutes);





module.exports = routes