import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dbConnection from './config/config.js'
import authRouter from './routes/authRoutes.js'
import cartRouter from './routes/cartRoutes.js'



const app = express();
dotenv.config()

const allowedOrigins = [
    'https://ebay-client.onrender.com',
    'http://localhost:5173'
];


// middleware
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended:false}));
// Enable CORS with the specified options
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    credentials: true
}));



const port = process.env.PORT || 8080;

// DATABASE CONNECTIONS
dbConnection();



// routes

app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);



app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})