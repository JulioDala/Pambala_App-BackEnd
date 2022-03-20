const db = require('./db')
const Pais = require('./Pais')
const Provincia = db.sequelize.define('provincia', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull:false
    }
})

Provincia.belongsTo(Pais,{
    constraint:true
})

Pais.hasMany(Provincia)

// Provincia.sync({alter:true});
 module.exports = Provincia;

