const db = require('./db')

const Promocao = db.sequelize.define('promocao', {
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
    imagem: {
        type: db.Sequelize.STRING,
        allowNull: true
    }
})

// Promocao.sync({ force: true });
module.exports = Promocao;

