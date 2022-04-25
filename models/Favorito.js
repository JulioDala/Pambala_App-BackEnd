const db = require('./db')
const Anuncio = require('./Anuncio')
const User = require('./User')

const Favorito = db.sequelize.define('favorito', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

Favorito.belongsTo(User, {
    constraint: true
})
User.hasMany(Favorito)

Favorito.belongsTo(Anuncio, {
    constraint: true
})

Anuncio.hasMany(Favorito)

// Favorito.sync({ force: true });
module.exports = Favorito;

