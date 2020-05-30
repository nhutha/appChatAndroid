require("dotenv").config();

import express,{Router} from "express";
import http from "http";
import bodyParser from "body-parser";
import morgan from "morgan";
import connectDatabase from "./libs/ConnectDatabase";
import appRouter from "./routers/index";
import socketIO from "socket.io";
import cors from "cors";

const app = express();

const server = http.createServer(app);
const io = socketIO(server);




app.use("/public",express.static("public"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());


const PORT = 3000 ;

connectDatabase();


app.use("/api",appRouter);

let lsSocket = [];

io.on("connection",socket=>{
    lsSocket.push(socket);
    console.log("user connect: ", socket.id);
 
    socket.on("send-message",data=>{
        console.log(data)
        for(let i=0;i<lsSocket.length;i++){
            if(lsSocket[i].id !== socket.id)
                lsSocket[i].emit("receive-message",data);
        }
        
    })

    socket.on("disconnect",()=>{
        console.log("client disconnect");
    });
})


app.use((error,req,res,next)=>{
    const status = error.status || 500;
    const message = error.message;
    console.log("message",message);
    res.status(status).send({
        message : message,
        statusCode : status
    });
});

app.use((req,res,next)=>{
    res.status(404).send({
        message : "PAGE NOT FOUND",
        statusCode : 404
    })
})

server.listen(PORT,"192.168.1.4",()=>{
    console.log(`APP START AT PORT ${PORT}`)
})


