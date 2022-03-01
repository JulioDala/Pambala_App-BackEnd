const db = require('./db')
const Provincia = require('./Provincia')

const Municipio = db.sequelize.define('municipio', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull:false
    }
})

Municipio.belongsTo(Provincia,{
    constraint:true
})

Provincia.hasMany(Municipio)

// Municipio.sync({force:true});
 module.exports = Municipio;

