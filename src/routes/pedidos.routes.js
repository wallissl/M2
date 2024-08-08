// Criado para simular exercícios da semana 06

const {Router} = require('express')
const PedidoController = require('../controllers/PedidoController')

const pedidosRoutes = new Router()

pedidosRoutes.post('/', PedidoController.criar.bind(PedidoController))


module.exports = pedidosRoutes