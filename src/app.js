import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Server, Socket } from 'socket.io';
import { createServer } from 'node:http';
import { connectDb, runServer } from './config';
import { login } from "./adapters/controllers/authController";
import loginRoutes from "./routes/loginRoutes";
import songRoutes from "./routes/songRoutes";



// App Initiated
dotenv.config();
const app = express()
app.use(bodyParser.json());
const server = createServer(app);
export const io = new Server(server, {
    cors: {
        origin: '*',
    }
});






//ROUTES
// login Routes
app.use('/api', loginRoutes);
app.use('/api', songRoutes);








runServer(server)
connectDb()
