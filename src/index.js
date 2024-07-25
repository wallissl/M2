const express = require("express")

const app = express()

app.get('/bemvindo', (request, response) => {
    response.send("Bem vindo usuário")
})

app.listen(3000, () => {
    console.log("Servidor online")
})