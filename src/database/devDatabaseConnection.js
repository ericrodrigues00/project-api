const sequelize = require("./index")

async function databaseSync() {
    try {
        await sequelize.sync()
        
        console.log(`Database rodando no ambiente de desenvolvimento`);
        
    } catch (e) {
        console.log("Não pôde conectar ao DB de desenvolvimento");
    }
}

module.exports = databaseSync