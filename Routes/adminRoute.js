var express = require('express')
var router = express.Router();
var carrouselController = require('../controllers/carrouselController')
var auth = require('../controllers/authController')

const upload = require('../middlewares/uploadImage');

router.get("/", auth, (req, res) => {

   if (req.user.tipo_usuario == 2) {
      res.send("Essa rota só deve ser vista pelo admin")
   } else if (req.user.tipo_usuario == 1) {
      res.status(401).send("Acesso Negado! Rota só para admins")
   }
})

router.post("/carrousel", upload.single('imagem'), carrouselController.register)
router.get("/carrousel", carrouselController.list)
router.put("/carrousel/:id", upload.single('imagem'), carrouselController.update)

module.exports = router;