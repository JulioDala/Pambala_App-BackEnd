const db = require('./db')

const Categoria = db.sequelize.define('categoria', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull:false
    }
})

// Categoria.sync({force:true});
 module.exports = Categoria;

