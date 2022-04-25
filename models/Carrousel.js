const db = require('./db')

const Carrousel = db.sequelize.define('carrousel', {
    imagem: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
})

// Carrousel.sync({ force: true });
module.exports = Carrousel;

