const Categoria = require('../models/Categoria')
const SubCategoria = require('../models/SubCategoria')
const Promocao = require('../models/Promocao')

const categoriaController = {
    register: async (req, res) => {

        const selectUser = await Categoria.findOne({ where: { email: req.body.email } })
        if (selectUser) {
            return res.status(400).send("O email ou Nº de telefone já existem")
        }
        const resultadoCreate = await Categoria.create({
            nome: req.body.nome
        })
        try {
            console.log(resultadoCreate);
            res.status(200).json(resultadoCreate);
        } catch (err) {
            res.status(500).send("Ocorreu um erro" + err)
        }
    },
    update: async (req, res) => {

        const resultadoSave = await SubCategoria.findAll({ include: Categoria, where: { categoriumId: req.params.id } })
        try {
            res.json(resultadoSave);
        } catch (err) {
            res.status(500).send("Ocorreu um erro" + err)
        }

    },
    list: async (req, res) => {
        const Encontrar = await Categoria.findAll({ include: SubCategoria })
        console.log(Encontrar)
        res.json((Encontrar))
    },
    listProdutos: async (req, res) => {
        const Encontrar = await SubCategoria.findAll({ where: { categoriumId: req.params.id } })
        const total = Encontrar.length
        res.json(({ Encontrar: Encontrar, total: total }))
    },
    apagarProdutos: async (req, res) => {
        const Encontrar = await SubCategoria.destroy({ where: { id: req.params.id } })
        try {
            res.status(200).send("Usuário Apagado com sucesso");
        } catch (err) {
            res.status(500).send("Ocorreu um erro" + err)
        }
    },
    delete: async (req, res) => {

        const resultadoCreate = await Promocao.create({
            imagem1: req.files['imagem1'][0].filename,
            imagem2: req.files['imagem2'][0].filename,
            imagem3: req.files['imagem3'][0].filename,
            imagem: req.files['imagem'][0].filename,
        })
        try {
            console.log(resultadoCreate);
            res.status(200).json(resultadoCreate);
        } catch (err) {
            res.status(500).send("Ocorreu um erro" + err)
        }
    }

}

module.exports = categoriaController;