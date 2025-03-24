const {Router} = require('express');
const cursoController = require('../controllers/cursoController');
const validaToken = require('../middlewares/validaToken');
const verificarPermissao = require('../middlewares/verificarPermissao');

const cursosRoutes = new Router();

cursosRoutes.post('/',verificarPermissao(['criarCurso']), cursoController.criar); // 'Criar curso';

cursosRoutes.get('/', verificarPermissao(['listarCurso']),cursoController.buscarTodos); // 'Listar curso';

cursosRoutes.get('/parametro', cursoController.listarPorParametro);

cursosRoutes.delete('/:id', verificarPermissao(['listarCurso', 'deletarCurso']), cursoController.deletar);

cursosRoutes.put('/:id', cursoController.atualizar);

cursosRoutes.get('/:id', cursoController.buscarUm);

module.exports = cursosRoutes