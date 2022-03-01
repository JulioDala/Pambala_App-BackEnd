require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
// const aluno = require('./Routes/aluno'
const app = express();
const userRoute = require('./Routes/userRoute')
const adminRoute = require('./Routes/adminRoute')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/user",userRoute)
app.use("/admin",adminRoute)

app.use('/Images', express.static('./upload/anuncio'))

app.get("/",(req,res)=>{
    res.send("Olá Mundo")
})


app.listen(3003,(error)=>{
    if (!error) {
        console.log("servidor rodando na porta 3003");
    } else {
        console.log(error)
    }
})