const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "API PETs",
        description: "Documentação da API de PETs usando Express e Sequelize",
        version: "1.0.0",
    },
    host: "localhost:3000",
    security: [{"apiKeyAuth": []}],
    securityDefinitions: {
        apiKeyAuth: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Insira o token JWT"
        }
    }
};

const outputFile = "./src/routes/doc.swagger.json";
const routes = ["./src/routes/routes.js"];

swaggerAutogen(outputFile, routes, doc);