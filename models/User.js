const db = require('./db')

const User = db.sequelize.define('user', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    telefone: {
        type: db.Sequelize.INTEGER,
        allowNull:false
    },
    provincia: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    municipio: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    bi: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    tipo_usuario: {
        type: db.Sequelize.INTEGER,
        default:1
    },
    senha: {
        type: db.Sequelize.STRING,
        allowNull:false
    }
})

// User.sync({force:true});
 module.exports = User;

