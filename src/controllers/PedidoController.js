// Criado para simular exercícios da semana 06

const Database = require("../database/Database");

class PedidoController extends Database{
    async criar(request, response){
         
        const dados = request.body

        let total = 0;

        dados.products.forEach(async (item) => {
            const produtoAtual = await this.database.query(`
                select price from products
                where id = $1
                
                `, [item.product_id])
                total = total + (produtoAtual.rows[0].price * item.amout)

                console.log(total)
        });

        // Inserir o pedido

        const meuPedido = await this.database.query(`
            
            insert into orders (client_id, address, observations, total) values ($1, $2, $3, $4)
            returning *
            `, [dados.client_id, dados.address, dados.observations, 100]
        )
            // Inserir os items
        dados.products.forEach(async item => {

            const produtoAtual = await this.database.query(`
                select price from products
                where id = $1
                
                `, [item.product_id])

             this.database.query(`            
                insert into orders_items (order_id, product_id, amount, price) values ($1, $2, $3, $4)
                returning *
                `, [meuPedido.rows[0].id,
                item.product_id,
                item.amout,
                produtoAtual.rows[0].price]
            )
        }) 
    }
}

module.exports = new PedidoController()