import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.js'
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/messageRoute.js'
import cors from 'cors';
import { app, server } from './lib/socket.js';
import path from 'path';




dotenv.config();
console.log("Prt",process.env.PORT)
const PORT = process.env.PORT || 5001;

const _dirname = path.resolve();


app.use(express.json({ limit: "Infinity" }));
app.use(express.urlencoded({ extended: true, limit: "Infinity" }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173 "||" http://localhost:5174 ",
    credentials: true
}));

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(_dirname, "../../frontend/dist")))
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(_dirname,"../../frontend","dist","index.html"))
    })
}

server.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
   connectDB()
})