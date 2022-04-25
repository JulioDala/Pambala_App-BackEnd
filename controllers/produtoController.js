const Categoria = require('../models/Categoria')
const SubCategoria = require('../models/SubCategoria')
const { Op } = require("sequelize");
const Anuncio = require('../models/Anuncio')
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
                const produto = await Anuncio.create({
                    nome: req.body.nome,
                    descricao: req.body.descricao,
                    preco: req.body.preco,
                    imagem1: req.files['imagem1'][0].filename,
                    imagem2: req.files['imagem2'][0].filename,
                    imagem3: req.files['imagem3'][0].filename,
                    imagem4: req.files['imagem4'][0].filename,
                    categoriumId: req.body.categoriumId,
                    subCategoriumId: req.body.subCategoriumId,
                    userId: id
                })
                res.status(200).json(produto);
            } catch (err) {
                res.status(500).send("Ocorreu um erro" + err)
            }
        }
    },
    update: async (req, res) => {

        const resultadoSave = await Anuncio.update(req.body, { where: { id: req.params.id } })
        try {
            res.json(resultadoSave);
        } catch (err) {
            res.status(500).send("Ocorreu um erro" + err)
        }

    },
    listAll: async (req, res) => {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(500).send("Ocorreu um erro")
        } else {
            try {
                const Encontrar = await Anuncio.findAll({ include: [Categoria, { association: 'avaliacao_usuarios' }] })
                let somaEstrela = 0
                let aux = 0
                let evals
                const Produtos = []
                Encontrar.map(({ avaliacao_usuarios }) => {
                    somaEstrela = 0
                    avaliacao_usuarios.map(({ estrela }, i) => {
                        somaEstrela = somaEstrela + estrela
                        if (avaliacao_usuarios.length - 1 == i) {
                            somaEstrela /= i + 1
                        }
                    })
                    Produtos.push(somaEstrela)
                })

                res.json(({ Encontrar: Encontrar, total: Produtos }))
            } catch (err) {
                res.status(500).send("Ocorreu um erro" + err)
            }
        }
    },
    listAllUserProducts: async (req, res) => {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(500).send("Ocorreu um erro")
        } else {
            try {
                const Encontrar = await Anuncio.findAll({ where: { userId: id } })
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

                const Encontrar = await Anuncio.findByPk(id_produto, {
                    include: [Categoria, SubCategoria, { association: 'avaliacao_usuarios', include: { association: 'user' } }, { association: 'user', include: [{ association: 'municipio', include: [{ association: 'provincium' }] }] }],
                })
                // let somaEstrela = 0
                // Encontrar.avaliacao_usuarios.map(({ estrela }) => somaEstrela += estrela)
                // // , totalEstrela: somaEstrela}
                res.status(200).json(Encontrar);
            } catch (err) {
                res.status(500).send("Ocorreu um erro" + err)
            }
        }
    },
    delete: (req, res) => {
        Anuncio.destroy({ where: { id: req.params.id } })
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
                const Encontrar = await Anuncio.findAll({
                    include: avaliacaoUsuario,
                })
                res.json((Encontrar))
            } catch (err) {
                res.status(500).send("Ocorreu um erro" + err)
            }
        }
    },
    filter: async () => {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(500).send("Ocorreu um erro")
        } else {
            try {
                const Encontrar = await Anuncio.findAll(
                    {
                        include: [{ association: 'categorium', where: { nome: req.body.categoria } }, { association: 'sub_categorium', where: { nome: req.body.sub_categoria } }]
                    })
                res.json((Encontrar))
            } catch (err) {
                res.status(500).send("Ocorreu um erro" + err)
            }
        }
    }

}

module.exports = produtoController;