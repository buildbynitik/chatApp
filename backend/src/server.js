import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.js'
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';

const app = express();

dotenv.config();
console.log("Prt",process.env.PORT)
const PORT = process.env.PORT || 5001;


app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
   connectDB()
})