const {Router} = require('express'); 
const ServicoController = require('../controllers/ServicoController');

const servicosRoutes = new Router();
// Aqui vem a implementação da minha rota.

servicosRoutes.post("/", ServicoController.criar)
servicosRoutes.get("/", ServicoController.listarTodos)


module.exports = servicosRoutes