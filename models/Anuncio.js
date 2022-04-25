const db = require('./db')
const Categoria = require('./Categoria')
const SubCategoria = require('./SubCategoria')
const User = require('./User')

const Anuncio = db.sequelize.define('anuncio', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    preco: {
        type: db.Sequelize.DECIMAL,
        allowNull: false
    },
    imagem1: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    imagem2: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    imagem3: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    imagem4: {
        type: db.Sequelize.STRING,
        allowNull: true
    }

})

Anuncio.belongsTo(Categoria, {
    constraint: true
})

Anuncio.belongsTo(SubCategoria, {
    constraint: true
})

Categoria.hasMany(Anuncio)

Anuncio.belongsTo(User, {
    constraint: true
})

User.hasMany(Anuncio)

// Anuncio.sync({ force: true });
module.exports = Anuncio;

