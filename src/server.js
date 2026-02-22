import express from 'express';
import movireRoutes from './routes/movieRoutes.js';
import { connectDB, disconnectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import watchListRoutes from './routes/watchListRoutes.js'
import cors from "cors";

// import { PrismaClient } from "@prisma/client";
const app = express();
const port = 3000;


dotenv.config();
connectDB();

app.use(cors({
  origin: "https://api-movies-backend.onrender.com",
  credentials: true
}));

//body passing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
//api routes
app.use('/movieRoutes', movireRoutes);
app.use('/auth', authRoutes);
app.use('/watchList', watchListRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

