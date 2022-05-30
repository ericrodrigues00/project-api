const sequelize = require("./tests")


async function databaseSync() {
    try {
        await sequelize.sync({force: true})
        
        console.log(`Database rodando no ambiente de testes`);
    } catch (e) {
        console.log("Não pôde conectar ao DB de teste");
    }
}

module.exports = databaseSync
