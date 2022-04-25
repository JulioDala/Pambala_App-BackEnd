const db = require('./db')

const Conversa = db.sequelize.define('conversa', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

// Conversa.sync({ force: true });
module.exports = Conversa;

