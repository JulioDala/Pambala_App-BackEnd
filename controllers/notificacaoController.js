const Notificacao = require('../models/Notificacao')
const Anuncio = require('../models/Anuncio')
const User = require('../models/User')

const notificacaoController = {
    register: async (req, res) => {

        const { id, para} = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(500).send("Ocorreu um erro")
        }
        const resultadoCreate = await Notificacao.create({
            texto: req.body.texto,
            para: para,
            userId:id
        })
        try {
            console.log(resultadoCreate);
            res.status(200).json(resultadoCreate);
        } catch (err) {
            res.status(500).send("Ocorreu um erro" + err)
        }
    },
    list: async (req, res) => {
            try {
                const Encontrar = await Notificacao.findAll({
                    include:User,
                    where:{para:req.params.id}
                })

                res.status(200).json(Encontrar);
            } catch (err) {
                res.status(500).send("Ocorreu um erro" + err)
            }
    }
}

module.exports = notificacaoController;