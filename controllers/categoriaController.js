const Categoria = require('../models/Categoria')
const SubCategoria = require('../models/SubCategoria')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const categoriaController = {
    register: async (req, res) => {

        const selectUser = await Categoria.findOne({ where: { email: req.body.email } })
        if (selectUser) {
            return res.status(400).send("O email ou Nº de telefone já existem")
        }
        const resultadoCreate = await Categoria.create({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            provincia: req.body.provincia,
            municipio: req.body.municipio,
            bi: req.body.bi,
            tipo_usuario: req.body.tipo_usuario,
            senha: bcrypt.hashSync(req.body.senha)
        })
        try {
            console.log(resultadoCreate);
            res.status(200).json(resultadoCreate);
        } catch (err) {
            res.status(500).send("Ocorreu um erro" + err)
        }
    },
    update: async (req, res) => {

        const user = await User.findByPk(req.params.id);
        console.log(user)
        nome: req.body.nome;
        email: req.body.email;
        telefone: req.body.telefone;
        dataNascimento: req.body.dataNascimento;
        provincia: req.body.provincia;
        municipio: req.body.municipio;
        bi: req.body.bi;
        senha: req.body.senha;

        const resultadoSave = await user.update().then(() => {
            console.log(resultadoSave)
            res.send("Usuário Actualizado com sucesso");
        }).catch((err) => {
            res.send("Houve Algum erro" + err);
        });

    },
    list: async (req, res) => {
        const Encontrar = await Categoria.findAll({include: SubCategoria})
        console.log(Encontrar)
        res.json((Encontrar))
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

module.exports = categoriaController;