import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 3002;

app.use(express.json());

const server = app.listen(port, () => {
  console.log("Servidor WebSocket corriendo en el puerto", port);
});

const io: Server = new Server(server, {
  cors: {
    origin: "*",
  }
});

io.on("connection", (socket) => {
  console.log("Usuario Conectado");
  socket.on("payment", (payment) => {
    console.log("Pago recibido:", payment);
    io.emit("payment", payment);
  });
  
  socket.on("disconnect", () => {
    console.log("Usuario Desconectado");
  });
});
