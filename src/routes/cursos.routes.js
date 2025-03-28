const {Router} = require('express');
const cursoController = require('../controllers/cursoController');
const validaToken = require('../middlewares/validaToken');
const verificarPermissao = require('../middlewares/verificarPermissao');

const cursosRoutes = new Router();

cursosRoutes.post('/',verificarPermissao(['criarCurso']), cursoController.criar

    /*
    
    #swagger.tags = ['Cursos'],
    #swagger.description = 'Endpoint para criar um curso',
    #swagger.parameters['criarCurso'] = {
      in: 'body',
      description: 'Dados do curso',
      required: true,
      schema: { 
        $nome: "Curso de JavaScript",
        $duracao: 40,
       
      }
    },   
    
    */

); // 'Criar curso';

cursosRoutes.get('/', verificarPermissao(['listarCurso']),cursoController.buscarTodos

    /*
        #swagger.tags = ['Cursos'],
    */

); // 'Listar curso';

cursosRoutes.get('/parametro', cursoController.listarPorParametro

     /*
        #swagger.tags = ['Cursos'],
    */
);

cursosRoutes.delete('/:id', verificarPermissao(['listarCurso', 'deletarCurso']), cursoController.deletar

 /*
        #swagger.tags = ['Cursos'],
    */
);

cursosRoutes.put('/:id', cursoController.atualizar
    
    /*
        #swagger.tags = ['Cursos'],
    */
);

cursosRoutes.get('/:id', cursoController.buscarUm

    /*
        #swagger.tags = ['Cursos'],
    */
);

module.exports = cursosRoutes