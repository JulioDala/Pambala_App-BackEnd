const db = require('./db')
const Municipio = require('./Municipio')
const User = db.sequelize.define('user', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    bi: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    tipo_usuario: {
        type: db.Sequelize.INTEGER,
        default: 1
    },
    senha: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    imagem: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    sexo: {
        type: db.Sequelize.ENUM('M', 'F'),
        allowNull: false
    },
    nascimento: {
        type: db.Sequelize.DATEONLY,
        allowNull: false
    },
    whatsapp: {
        type: db.Sequelize.STRING,
        allowNull: true
    }
})

User.belongsTo(Municipio, {
    constraint: true
})

Municipio.hasMany(User)

// User.sync({ alter: true });
module.exports = User;

