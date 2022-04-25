const Categoria = require('../models/Categoria')
const SubCategoria = require('../models/SubCategoria')
const Favorito = require('../models/Favorito')
const Anuncio = require('../models/Anuncio')
const User = require('../models/User')

const favoritoController = {
    register: async (req, res) => {
        const { id,id_anuncio } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(500).send("Ocorreu um erro")
        } else {
            const anuncio = await Favorito.create({
                userId:id,
                anuncioId:id_anuncio
            });
            try {
                res.status(200).json(anuncio);
                }  
            catch (err) {
                res.status(500).send("Ocorreu um erro" + err)
            }
        }
    },
    listAll: async (req, res) => {
            try {
                const Encontrar = await User.findOne({include:[{association:'favoritos', include:{association:'anuncio'}}], where: { id: req.params.id } })
                res.json(Encontrar)
            } catch (err) {
                res.status(500).send("Ocorreu um erro" + err)
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