const Sequelize = require('sequelize')
const sequelize = new Sequelize('pambalaapi2', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
})

sequelize.authenticate().then(function () {
    console.log("Conectado com sucesso")
}).catch((erro) => {
    console.log("falha ao conectar" + erro)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}