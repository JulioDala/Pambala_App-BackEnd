const User = require('../models/User')
const Produto = require('../models/Produto')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
    register: async (req, res) => {

        const selectUser = await User.findOne({ where: { email: req.body.email } })
        if (selectUser) {
            return res.status(400).send("O email ou Nº de telefone já existem")
        }
        const resultadoCreate = await User.create({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            provincia: req.body.provincia,
            municipio: req.body.municipio,
            bi: req.body.bi,
            sexo: req.body.sexo,
            whatsapp: req.body.whatsapp,
            nascimento: req.body.nascimento,
            imagem: req.file.filename,
            tipo_usuario: req.body.tipo_usuario,
            senha: bcrypt.hashSync(req.body.senha),
            bairroId: req.body.bairro
        })
        try {
            console.log(resultadoCreate);
            res.status(200).json(resultadoCreate);
        } catch (err) {
            res.status(500).send("Ocorreu um erro" + err)
        }
    },
    login: async (req, res) => {

        const selectUser = await User.findOne({ where: { email: req.body.email } })
        if (!selectUser) {
            return res.status(400).send("Email ou senha incorrecta")
        }

        const senhaAndEmail = bcrypt.compareSync(req.body.senha, selectUser.senha)
        if (!senhaAndEmail) {
            return res.status(400).json({ status: 2 })
        }
        const token = jwt.sign({ id: selectUser.id, tipo_usuario: selectUser.tipo_usuario }, process.env.TOKEN_SECRET)
        res.header('authorization-token', token)
        res.cookie('token', token, { httpOnly: true })
        res.status(200).json({ status: 1, token: token, id: selectUser.id, nome: selectUser.nome, tipo: selectUser.tipo_usuario,imagem: selectUser.imagem });
    },
    updateImage: async (req, res) => {
        const resultadoSave = await User.update({ imagem: req.file.filename},{where:{id:req.params.id}})
            try {
                res.json(resultadoSave);
            } catch (err) {
                res.status(500).send("Ocorreu um erro" + err)
            }

    },
    update: async (req, res) => {
        const resultadoSave = await User.update(req.body,{where:{id:req.params.id}})
            try {
                res.json(resultadoSave);
            } catch (err) {
                res.status(500).send("Ocorreu um erro" + err)
            }

    },
    list: async (req, res) => {

        const Encontrar = await User.findAll({ include: [{ association: 'bairro', include: [{ association: 'municipio', include: [{ association: 'provincium', include: [{ association: 'pai' }] }] }] }] })
        const total = Encontrar.length
        console.log(Encontrar)
        res.json(({ Encontrar: Encontrar, total: total }))
    },
    listOne: async (req, res) => {
        const Encontrar = await User.findOne({ where: { id: req.params.id }, include: [{ association: 'bairro', include: [{ association: 'municipio', include: [{ association: 'provincium', include: [{ association: 'pai' }] }] }] }] })
        console.log(Encontrar)
        res.json(( Encontrar))
    },
    delete: (req, res) => {
        User.destroy({ where: { id: req.params.id } })
        try {
            res.status(200).send("Usuário Apagado com sucesso");
        } catch (err) {
            res.status(500).send("Ocorreu um erro" + err)
        }
    },
    uploadImage: async (req, res) => {
        if (req.file) {
            console.log(req.file)
            const resultadoCreate = await Produto.create({ imagem: req.file.filename })
            return res.status(200).json({ mensagem: "Upload feito com sucesso" });
        } else {
            return res.status(500).json({ mensagem: "Ocorreu um erro" })
        }
    },
    checkToken: async (req, res) => {
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['authorization-token'];
        if (!token) {
            res.json({ status: 401, msg: "Não autorizado: Token inexistente" })
        } else {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.json({ status: 401, msg: "Não autorizado: Token inválido" })
                } else {
                    res.json({ status: 200 })
                }
            })
        }
    },
    logout: async (req, res) => {
        const token = req.headers.token;
        if (token) {
            res.cookie('token', null, { httpOnly: true })
        } else {
            res.status(401).send(" Logout Não autorizado")
        }
        res.send("Sessão finalizada com sucesso")
    }

}

module.exports = userController;