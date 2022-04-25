const db = require('./db')
const Anuncio = require('./Anuncio')
const User = require('./User')

const avaliacaoUsuario = db.sequelize.define('avaliacao_usuario', {
    estrela: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    descricao: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
})

avaliacaoUsuario.belongsTo(Anuncio, {
    constraint: true,
})

Anuncio.hasMany(avaliacaoUsuario)

avaliacaoUsuario.belongsTo(User, {
    constraint: true,
})

User.hasOne(avaliacaoUsuario)

// avaliacaoUsuario.sync({ force: true });
module.exports = avaliacaoUsuario;

