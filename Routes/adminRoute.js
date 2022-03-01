var express = require('express')
var router = express.Router();
// var Aluno = require('../models/aluno')
var auth = require('../controllers/authController')
 
 router.get("/", auth, (req,res)=>{

     if (req.user.tipo_usuario == 2) {
        res.send("Essa rota só deve ser vista pelo admin")
     } else if (req.user.tipo_usuario == 1){
        res.status(401).send("Acesso Negado! Rota só para admins")
     }
 })

module.exports = router;