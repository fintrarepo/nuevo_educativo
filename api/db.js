const { Client } = require('pg')
const connectionData = {
    user: 'postgres',
    host: 'postgre.fintra.co',
    database: 'fintra',
    password: 'bdversion17',
    port: 5432,
}


class Db {

    constructor() {
        this.connect()
    }

    connect() {
        this.client = new Client(connectionData)
        
        this.client.on('error', error => {
            // ⋮
            this.connect();
        });

        this.client.connect()
            .then(() => {
                console.log('Conectado')
            })
            .catch(err => {
                console.log(err)
            })
    }

    end() {
        this.client.end()
            .then(() => {
                console.log('Chao papá')
            })
    }

}

const instance = new Db();
Object.freeze(instance);

module.exports = instance;