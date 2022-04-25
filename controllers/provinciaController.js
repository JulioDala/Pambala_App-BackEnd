const Municipio = require('../models/Municipio')
const Provincia = require('../models/Provincia')
const Categoria = require('../models/Categoria')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Bairro = require('../models/Bairro')

const provinciaController = {
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


    },
    list: async (req, res) => {
        const Encontrar = await Provincia.findAll({ include: [{ association: 'municipios', include: [{ association: 'bairros' }] }] })
        console.log(Encontrar)
        res.json((Encontrar))
    },

    listprovincia: async (req, res) => {
        const Encontrar = await Bairro.findAll()
        console.log(Encontrar)
        res.json((Encontrar))
    },
    listmunicipio: async (req, res) => {
        const Encontrar = await Bairro.findAll({ include: [{ association: 'municipios', include: [{ association: 'bairros' }] }] })
        console.log(Encontrar)
        res.json((Encontrar))
    },
    listbairro: async (req, res) => {
        const Encontrar = await Bairro.findAll({ where: { municipioId: req.params.id } })
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

module.exports = provinciaController;