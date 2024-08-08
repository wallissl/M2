const {Router} = require('express'); 
const ServicoController = require('../controllers/ServicoController');

const servicosRoutes = new Router();
// Aqui vem a implementação da minha rota.

servicosRoutes.post("/", ServicoController.criar)
servicosRoutes.get("/", ServicoController.listarTodos)
servicosRoutes.get("/:id", ServicoController.listarUm)
servicosRoutes.delete("/:id", ServicoController.deletar)
servicosRoutes.put("/:id", ServicoController.atualizar)


module.exports = servicosRoutes