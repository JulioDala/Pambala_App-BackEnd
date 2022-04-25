const db = require('./db')
const Conversa = require('./Conversa')
const User = require('./User')

const Mensagem = db.sequelize.define('mensagem', {
    mensagem: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
})

Mensagem.belongsTo(Conversa, {
    constraint: true
})

Conversa.hasMany(Mensagem)

Mensagem.belongsTo(User, {
    constraint: true
})

User.hasMany(Mensagem)

// Mensagem.sync({ force: true });
module.exports = Mensagem;

