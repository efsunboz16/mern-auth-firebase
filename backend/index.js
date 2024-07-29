import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userroute.js'
import authRoutes from './routes/authroute.js'
dotenv.config()

const app = express();

app.use(express.json())

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log(err);
})



app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes)