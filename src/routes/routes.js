const {Router}= require('express')

/* const petsRoutes = require('./pets.routes'); // Importando o arquivo da rota de pets
const vacinasRoutes = require('./vacinas.routes'); //Importando o arquivo da rota de vacinas
const servicosRoutes = require('./servicos.routes');
const pedidosRoutes = require('./pedidos.routes') */
const responsaveisRoutes = require('./responsaveis.routes')

const routes = new Router()

routes.use('/responsaveis', responsaveisRoutes)

// Utilizando as rotas importadas
/* routes.use('/pets', petsRoutes); // o /pets é o endpoint
routes.use('/vacinas', vacinasRoutes);
routes.use('/servicos', servicosRoutes);
routes.use('/pedidos', pedidosRoutes); */ // Criado para simular exercícios da semana 06

module.exports = routes