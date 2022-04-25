const Carrousel = require('../models/Carrousel')

const carrouselController = {
    register: async (req, res) => {
        const resultadoCreate = await Carrousel.create({
            imagem: req.file.filename,
            descricao: req.body.descricao
        })
        try {
            res.status(200).json(resultadoCreate);
        } catch (err) {
            res.status(500).send("Ocorreu um erro" + err)
        }
    },
    list: async (req, res) => {
        try {
            const Encontrar = await Carrousel.findAll()
            res.status(200).json(Encontrar);
        } catch (err) {
            res.status(500).send("Ocorreu um erro" + err)
        }
    },
    update: async (req, res) => {
        try {
            const data = {
                imagem: req.file.filename,
                descricao: req.body.descricao
            }
            const Encontrar = await Carrousel.update(data, { where: { id: req.params.id } })
            res.status(200).json(Encontrar);
        } catch (err) {
            res.status(500).send("Ocorreu um erro" + err)
        }
    }
}

module.exports = carrouselController;