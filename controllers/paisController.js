const Pais = require('../models/Pais')
const Municipio = require('../models/Municipio')
const Provincia = require('../models/Provincia')
const Bairro = require('../models/Bairro')

const paisController = {
    register: async (req, res) => {

    },
    update: async (req, res) => {

    },
    list: async (req, res) => {
        const Encontrar = await Pais.findAll({ include: [{ association: 'provincia', include: [{ association: 'municipios',include: [{association:'bairros'}]}] }] })
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

module.exports = paisController;