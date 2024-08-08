const express = require("express")
const petsRoutes = require('./routes/pets.routes'); // Importando o arquivo da rota de pets
const vacinasRoutes = require("./routes/vacinas.routes"); //Importando o arquivo da rota de pets
const servicosRoutes = require("./routes/servicos.routes");
const pedidosRoutes = require("./routes/pedidos.routes")

const app = express();
app.use(express.json()) // Habilita o servidor a receber JSON

// Utilizando as rotas importadas
app.use('/pets', petsRoutes);
app.use('/vacinas', vacinasRoutes);
app.use('/servicos', servicosRoutes);
app.use('/pedidos', pedidosRoutes); // Criado para simular exercícios da semana 06


app.listen(3000, () => {
    console.log("Servidor online")
})