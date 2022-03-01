const db = require('./db')

const Provincia = db.sequelize.define('provincia', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull:false
    }
})

// Provincia.sync({force:true});
 module.exports = Provincia;

