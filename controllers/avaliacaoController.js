const avaliacaoUsuario = require('../models/AvaliacaoUsuario')
const Produto = require('../models/Produto')
const User = require('../models/User')

const avaliacaoController = {
    register: async (req, res) => {

        const { id, id_produto} = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(500).send("Ocorreu um erro")
        }
        const resultadoCreate = await avaliacaoUsuario.create({
            estrela: req.body.estrela,
            descricao: req.body.descricao,
            produtoId: id_produto
        })
        try {
            console.log(resultadoCreate);
            res.status(200).json(resultadoCreate);
        } catch (err) {
            res.status(500).send("Ocorreu um erro" + err)
        }
    },
    list: async (req, res) => {
        const { id, id_produto } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(500).send("Ocorreu um erro")
        }
        const Encontrar = await avaliacaoUsuario.findAll()
        console.log(Encontrar)
        res.json((Encontrar))
    }
}

module.exports = avaliacaoController;