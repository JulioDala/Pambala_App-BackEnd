const Categoria = require('../models/Categoria')
const SubCategoria = require('../models/SubCategoria')
const ProdutoCategoria = require('../models/ProdutoCategoria')
const { Op } = require("sequelize");
const Produto = require('../models/Produto')
const User = require('../models/User')
const avaliacaoUsuario = require('../models/AvaliacaoUsuario')




const produtoController = {
    register: async (req, res) => {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(500).send("Ocorreu um erro")
        } else {
            try {
                const produto = await Produto.create({
                    nome: req.body.nome,
                    descricao: req.body.descricao,
                    preco: req.body.preco,
                    imagem: req.file.filename,
                    categoriumId: req.body.categoriumId,
                    subCategoriumId: req.body.subCategoriumId,
                })
                await user.addProdutos(produto);
                res.status(200).json(produto);
            } catch (err) {
                res.status(500).send("Ocorreu um erro" + err)
            }
        }
    },
    update: async (req, res) => {

        const resultadoSave = await user.update().then(() => {
            console.log(resultadoSave)
            res.send("Usuário Actualizado com sucesso");
        }).catch((err) => {
            res.send("Houve Algum erro" + err);
        });

    },
    listAll: async (req, res) => {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(500).send("Ocorreu um erro")
        } else {
            try {
                const Encontrar = await Produto.findAll(
                    {
                        where: {
                            preco: {
                                [Op.between]: [1000, 10000]
                            }
                        }, include: [{ association: 'categorium', where: { nome: req.body.categoria } },{ association: 'sub_categorium', where: { nome: req.body.sub_categoria } }, { association: 'avaliacao_usuarios', where: { estrela: req.body.avaliacao } }]
                    }
                )
                res.json((Encontrar))
            } catch (err) {
                res.status(500).send("Ocorreu um erro" + err)
            }
        }
    },
    list: async (req, res) => {

        const { id, id_produto } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(500).send("Ocorreu um erro")
        } else {
            try {

                const Encontrar = await Produto.findByPk(id_produto, {
                    include: [Categoria, SubCategoria, avaliacaoUsuario],
                    attributes: ['id', 'nome', 'descricao', 'preco', 'imagem'],
                    through: [{ attributes: ['nome'] }, { attributes: ['nome'] }]
                })
                res.status(200).json(Encontrar);
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
    },
    listAllReviews: async (req, res) => {

        const { id, id_produto } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(500).send("Ocorreu um erro")
        } else {
            try {
                const Encontrar = await Produto.findAll({
                    include: avaliacaoUsuario,
                })
                res.json((Encontrar))
            } catch (err) {
                res.status(500).send("Ocorreu um erro" + err)
            }
        }
    }

}

module.exports = produtoController;