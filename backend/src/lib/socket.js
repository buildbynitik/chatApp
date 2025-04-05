import { Server } from 'socket.io';
import http from "http";
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // ✅ No space
        credentials: true,
    }
});
// used to store online user

const userSocketMap = {} 

export function getReciverSocketId(userId){
return userSocketMap[userId]
}


io.on("connection", (socket) => {
    console.log("A user CONNECTED", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId) userSocketMap[userId] = socket.id;

    // emit is used to send events to all the connected clients
    io.emit("getUserOnline",Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("A user DISCONNECTED", socket.id);

        delete userSocketMap[userId];
        io.emit("getUserOnline",Object.keys(userSocketMap))
    });
});


export { io, app, server };
