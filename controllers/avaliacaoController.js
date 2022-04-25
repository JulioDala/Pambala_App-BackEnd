const avaliacaoUsuario = require('../models/AvaliacaoUsuario')
const Anuncio = require('../models/Anuncio')
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
            anuncioId: id_produto,
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
        const { id, id_produto } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(500).send("Ocorreu um erro")
        } else {
            try {

                const Encontrar = await Anuncio.findByPk(id_produto, {
                    include: [ {association:'avaliacao_usuarios', include:{association:'user'}}],
                    attributes: ['id', 'nome', 'descricao', 'preco', 'imagem'],
                    through: [{ attributes: ['nome'] }, { attributes: ['nome'] }]
                })

                res.status(200).json(Encontrar.avaliacao_usuarios);
            } catch (err) {
                res.status(500).send("Ocorreu um erro" + err)
            }
        }
    }
}

module.exports = avaliacaoController;