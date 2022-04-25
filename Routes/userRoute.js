var express = require('express')
var router = express.Router();

var userController = require('../controllers/userController')
var categoriaController = require('../controllers/categoriaController')
var paisController = require('../controllers/paisController')
var provinciaController = require('../controllers/provinciaController')
const produtoController = require('../controllers/produtoController');
const favoritoController = require('../controllers/favoritoController');
const avaliacaoController = require('../controllers/avaliacaoController');
const conversaController = require('../controllers/conversaController');
const notificacaoController = require('../controllers/notificacaoController');

const upload = require('../middlewares/uploadImage');

//Usuário
router.get("/listar", userController.list)
router.get("/listar/:id", userController.listOne)
router.get("/listar/usuarios/:id", userController.listUsers)
router.post("/cadastrar", upload.single('imagem'), userController.register)
router.post("/login", userController.login)
router.post("/upload", upload.array('image', 2), userController.uploadImage)
router.put("/atualizar/imagem/:id", upload.single('imagem'), userController.updateImage)
router.put("/atualizar/:id", userController.update)
router.delete("/deletar/:id", userController.delete)
router.get("/checkToken", userController.checkToken)
router.get("/logout", userController.logout)

//Chat
router.post("/:id/conversar/:idUser", conversaController.register)
router.get("/conversa/listar", conversaController.list)

//notificacao
router.get("/notificacao/listar/:id", notificacaoController.list)
router.post("/:id/notificacao/enviar/:para", notificacaoController.register)

//Categoria
router.get("/categorias/listar", categoriaController.list)
router.get("/categorias/listar/subcategorias/:id", categoriaController.listProdutos)
router.delete("/deletar/subcategoria/:id", categoriaController.apagarProdutos)
router.get("/categorias/listar/s/:id", categoriaController.update)
router.post("/categorias/cadastrar", categoriaController.register)
router.post("/promocao/cadastrar", upload.fields([{ name: 'imagem1', maxCount: 1 }, { name: 'imagem2', maxCount: 1 }, { name: 'imagem3', maxCount: 1 }, { name: 'imagem', maxCount: 1 }]), categoriaController.delete)

//Província
router.get("/provincia/listar", provinciaController.list)
router.get("/provincia/listar/:id", provinciaController.listbairro)
router.get("/pais/listar", paisController.list)
router.post("/provincia/cadastrar", provinciaController.register)

//Produto
router.get("/:id/produto/listar", produtoController.listAll)
router.get("/:id/produto/listar/todos", produtoController.listAllUserProducts)
router.get("/:id/produto/listar/filtrar", produtoController.filter)
router.get("/:id/produto/listar/:id_produto", produtoController.list)
router.delete("/produto/apagar/:id", produtoController.delete)
router.get("/:id/produto/listar/:id_produto/avaliacoes", produtoController.listAllReviews)
router.post("/:id/produto/cadastrar", upload.fields([{ name: 'imagem1', maxCount: 1 }, { name: 'imagem2', maxCount: 1 }, { name: 'imagem3', maxCount: 1 }, { name: 'imagem4', maxCount: 1 }]), produtoController.register)

//Favoritos
router.get("/produto/listar/favoritos/:id", favoritoController.listAll)
router.get("/:id/produto/listar/:id_produto", favoritoController.delete)
router.post("/:id/produto/favorito/:id_anuncio", favoritoController.register)

//Avaliação de Produtos
router.post("/:id/produto/:id_produto/avaliar", avaliacaoController.register)
router.get("/:id/produto/:id_produto/avaliar", avaliacaoController.list)

module.exports = router;