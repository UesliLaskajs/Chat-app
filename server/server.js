const express=require("express")
const app=express();
const socket=require("socket.io")
const cors=require("cors")
const http=require("http")

const port=4000
const ipAddress="0.0.0.0"

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const server=http.createServer(app);
const io=socket(server,{
    cors:{
        origin:"http://localhost:5173",
        allowedHeaders:["*"],
        credentials:true,
    }
})
io.on("connection",(socket)=>{
    console.log(`a user connected ${socket.id}`)
    

    socket.on("message",(data)=>{
        console.log(`Message from client ${socket.id} ${data} `)

        io.emit("message",data)
    })

    

    socket.on("disconnect",()=>{
        console.log(`${socket.id} disconnected`)
    }) 
})

server.listen(port,ipAddress,()=>{
    console.log(`Server is running on http://${ipAddress}:${port} `)
})