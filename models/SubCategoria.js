const db = require('./db')
const Categoria = require('./Categoria')

const SubCategoria = db.sequelize.define('sub_categoria', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull:false
    }
})

SubCategoria.belongsTo(Categoria,{
    constraint:true
})

Categoria.hasMany(SubCategoria)

// SubCategoria.sync({force:true});
 module.exports = SubCategoria;

