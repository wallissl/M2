const {Pool} = require('pg');

class Database{
    constructor(){
        this.database = new Pool({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password:'senai',
            database:'api_pets'
        })
    }
}

module.exports = Database;