import express from 'express';

import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js";
import adminRoute from './routes/adminRoute.js'
import cors from 'cors';
dotenv.config();
import {notFound,errorHandler  } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


app.use('/api/users', userRoutes)
app.use("/api/admin", adminRoute);

app.get('/',(req,res)=>res.send('server is running'))

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>console.log(`server started on port ${port}`))