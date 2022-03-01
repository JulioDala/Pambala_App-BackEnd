var express = require('express')
var router = express.Router();

var userController = require('../controllers/userController')
var categoriaController = require('../controllers/categoriaController')
var provinciaController = require('../controllers/provinciaController')
const produtoController = require('../controllers/produtoController');
const favoritoController = require('../controllers/favoritoController');
const avaliacaoController = require('../controllers/avaliacaoController');

const upload = require('../middlewares/uploadImage');


router.get("/listar", userController.list)
router.post("/cadastrar", userController.register)
router.post("/login", userController.login)
router.post("/upload", upload.single('image'), userController.uploadImage)
router.put("/atualizar/:id", userController.update)
router.delete("/deletar/:id", userController.delete)
router.get("/checkToken", userController.checkToken)
router.get("/logout", userController.logout)

router.get("/categorias/listar", categoriaController.list)
router.post("/categorias/cadastrar", categoriaController.register)

router.get("/provincia/listar", provinciaController.list)
router.post("/provincia/cadastrar", provinciaController.register)

router.get("/:id/produto/listar", produtoController.listAll)
router.get("/:id/produto/listar/:id_produto", produtoController.list)
router.get("/:id/produto/listar/:id_produto/avaliacoes", produtoController.listAllReviews)
router.post("/:id/produto/cadastrar",upload.single('image'), produtoController.register)

router.get("/:id/produto/listar/favoritos", favoritoController.listAll)
router.get("/:id/produto/listar/:id_produto", favoritoController.delete)
router.post("/:id/produto/favorito", favoritoController.register)

router.post("/:id/produto/:id_produto/avaliar", avaliacaoController.register)



module.exports = router;