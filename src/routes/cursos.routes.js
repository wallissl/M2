const {Router} = require('express');
const cursoController = require('../controllers/cursoController');

const cursosRoutes = new Router();

cursosRoutes.post('/', cursoController.criar);
cursosRoutes.get('/', cursoController.buscarTodos);
cursosRoutes.delete('/:id', cursoController.deletar);
cursosRoutes.put('/:id', cursoController.atualizar);
cursosRoutes.get('/:id', cursoController.buscarUm);

module.exports = cursosRoutes