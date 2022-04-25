const db = require('./db')
const Anuncio = require('./Anuncio')
const User = require('./User')

const Notificacao = db.sequelize.define('notificacao', {
    para: {
        type: db.Sequelize.INTEGER,
        allowNull:false
    },
    texto: {
        type: db.Sequelize.STRING,
        allowNull:false
    }
})

Notificacao.belongsTo(User,{
    constraint:true,
})

User.hasMany(Notificacao)

// Notificacao.sync({force:true});
 module.exports = Notificacao;

