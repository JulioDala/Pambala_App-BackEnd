const Conversa = require('../models/Conversa')
const Mensagem = require('../models/Mensagem')
const User = require('../models/User')

const conversaController = {
    register: async (req, res) => {
        const { id } = req.params;
        try {
            const conversa = await Conversa.create({
                id: id,

            })
            res.status(200).json(conversa);
        } catch (err) {
            res.status(500).send("Ocorreu um erro" + err)
        }
    },
    sendMessage: async (req, res) => {
        const { userId, conversaId } = req.params;
        try {
            const mensagem = await Mensagem.create({
                mensagem: req.body.mensagem,
                conversaId: conversaId,
                userId: userId
            })
            res.status(200).json(mensagem);
        } catch (err) {
            res.status(500).send("Ocorreu um erro" + err)
        }
    },
    list: async (req, res) => {
        const Encontrar = await Conversa.findAll({ include: Mensagem })
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

module.exports = conversaController;