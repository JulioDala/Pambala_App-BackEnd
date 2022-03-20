const db = require('./db')
const Municipio = require('./Municipio')

const Bairro = db.sequelize.define('bairro', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull:false
    }
})

Bairro.belongsTo(Municipio,{
    constraint:true
})

Municipio.hasMany(Bairro)

// Bairro.sync({force:true});
 module.exports = Bairro;

