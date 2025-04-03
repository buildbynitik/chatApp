import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.js'
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/messageRoute.js'
import cors from 'cors';
const app = express();

dotenv.config();
console.log("Prt",process.env.PORT)
const PORT = process.env.PORT || 5001;


app.use(express.json({ limit: "Infinity" }));
app.use(express.urlencoded({ extended: true, limit: "Infinity" }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", authRoute);
app.use("/api/message",messageRoute)

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
   connectDB()
})