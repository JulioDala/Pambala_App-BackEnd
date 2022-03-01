const db = require('./db')
const Categoria = require('./Categoria')
const SubCategoria = require('./SubCategoria')

const Produto = db.sequelize.define('produto', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    descricao: {
        type: db.Sequelize.TEXT,
        allowNull:false
    },
    preco: {
        type: db.Sequelize.DECIMAL,
        allowNull:false
    },
    imagem: {
        type: db.Sequelize.STRING,
        allowNull:true
    }

})

Produto.belongsTo(Categoria,{
    constraint:true
})

Produto.belongsTo(SubCategoria,{
    constraint:true
})

Categoria.hasMany(Produto)

// Produto.sync({alter:true});
 module.exports = Produto;

