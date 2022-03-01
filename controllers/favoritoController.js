const Categoria = require('../models/Categoria')
const SubCategoria = require('../models/SubCategoria')
const Favorito = require('../models/Favorito')
const Produto = require('../models/Produto')
const User = require('../models/User')

const favoritoController = {
    register: async (req, res) => {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(500).send("Ocorreu um erro")
        } else {
            try {
                const produto = await Favorito.create({
                    produto_id: req.body.produto_id,
                    user_id: id
                })
                res.status(200).json(produto);
            } catch (err) {
                res.status(500).send("Ocorreu um erro" + err)
            }
        }
    },
    listAll: async (req, res) => {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(500).send("Ocorreu um erro")
        } else {
            try {
                const Encontrar = await Favorito.findAll()
                res.json((Encontrar))
            } catch (err) {
                res.status(500).send("Ocorreu um erro" + err)
            }
        }
    },
    delete: (req, res) => {
        User.destroy({ where: { id: req.params.id } })
        try {
            res.status(200).send("Usuário Apagado com sucesso");
        } catch (err) {
            res.status(500).send("Ocorreu um erro" + err)
        }
    }

}

module.exports = favoritoController;