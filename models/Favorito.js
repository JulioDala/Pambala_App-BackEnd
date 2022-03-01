const db = require('./db')
const Produto = require('./Produto')
const User = require('./User')

const Favorito = db.sequelize.define('favorito', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
})

Produto.belongsToMany(User,{
    through:{model: Favorito},
    constraint:true,
    foreignKey: 'produto_id',
    otherKey: 'user_id',
})

User.belongsToMany(Produto,{
    through:{model: Favorito},
    constraint:true,
    foreignKey: 'user_id',
    otherKey: 'produto_id',
})

// Favorito.sync({force:true});
 module.exports = Favorito;

