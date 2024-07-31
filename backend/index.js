import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userroute.js'
import authRoutes from './routes/authroute.js'

// import { Buffer } from "buffer";
// Global Buffer tanımlaması
// window.Buffer = Buffer;
// JSON Web Token işlemleri
// import jwt from "jsonwebtoken";
// const token = jwt.sign({ foo: "bar" }, "shhhhh");
// console.log(token);

// import { defineConfig } from 'vite';
// import { createExternalModule } from 'rollup';

// export default defineConfig({
//     build: {
//         rollupOptions: {
//             external: [
//                 createExternalModule('crypto'), // crypto modülünü dışarı aktar
//                 createExternalModule('buffer'), // buffer modülünü dışarı aktar
//             ],
//         },
//     },
// });

dotenv.config()

const corsOptions = {
    origin: 'http://localhost:3000', // İstemci kökeni
    optionsSuccessStatus: 200
};

const app = express();

app.use(express.json())
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log(err);
})



app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        error: message,
        statusCode: statusCode
    });
})