const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.header('authorization-token')
    if(!token){
        return res.status(401).send("Acesso Negado")
    }

    try {
        const verificarUsuario = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verificarUsuario;
        next();
    } catch (error) {
        res.status(401).send("Acesso Negado" +error)
    }
}