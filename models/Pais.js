const db = require('./db')

const Pais = db.sequelize.define('pais', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull:false
    }
})

// Pais.sync({force:true});
 module.exports = Pais;

