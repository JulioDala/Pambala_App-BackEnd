const db = require('./db')
const Produto = require('./Produto')
const User = require('./User')

const ProdutoCategoria = db.sequelize.define('produto_categoria', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
})

Produto.belongsToMany(User,{
    through:{model: ProdutoCategoria},
    constraint:true,
    foreignKey: 'produto_id',
    otherKey: 'user_id',
})

User.belongsToMany(Produto,{
    through:{model: ProdutoCategoria},
    constraint:true,
    foreignKey: 'user_id',
    otherKey: 'produto_id',
})

// ProdutoCategoria.sync({alter:true});
 module.exports = ProdutoCategoria;

