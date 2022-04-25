require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const server = require("http").createServer(app);
const PORT = 3003;
const cors = require("cors");
const io = require("socket.io")(server, { cors: { origin: "http://localhost:3000" } });
// const aluno = require('./Routes/aluno'

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


io.on("connect", (socket) => {
	console.log("New user connected!");
	let nameSocket;

	socket.on("userConnected", (name) => {
		nameSocket = name;
		io.emit("receiveMessage", { bot: true, message: `${name} connected!` });
	});

	socket.on("message", (data) => {
		console.log(data);
		io.emit("receiveMessage", data);
	});

	socket.on("disconnect", () => {
		if (!nameSocket) return;
		io.emit("receiveMessage", { bot: true, message: `${nameSocket} left!` });
	});
});

server.listen(PORT, () => console.log("Server running..."));