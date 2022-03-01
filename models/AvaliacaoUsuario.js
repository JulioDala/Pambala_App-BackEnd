const db = require('./db')
const Produto = require('./Produto')

const avaliacaoUsuario = db.sequelize.define('avaliacao_usuario', {
    estrela: {
        type: db.Sequelize.INTEGER,
        allowNull:false
    },
    descricao: {
        type: db.Sequelize.TEXT,
        allowNull:false
    }
})

avaliacaoUsuario.belongsTo(Produto,{
    constraint:true,
})

Produto.hasMany(avaliacaoUsuario)

// avaliacaoUsuario.sync({force:true});
 module.exports = avaliacaoUsuario;

