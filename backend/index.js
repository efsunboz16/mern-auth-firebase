import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userroute.js'
import authRoutes from './routes/authroute.js'
dotenv.config()

const app = express();

app.use(express.json())
app.use(cors());

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