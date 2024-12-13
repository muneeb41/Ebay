import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dbConnection from './config/config.js'
import authRouter from './routes/authRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs';
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger-output.json', 'utf-8'));
import { userSwagger } from './swagger/authSwagger.js'
import { cartSwagger } from './swagger/cartSwagger.js'




const app = express();
dotenv.config()

const allowedOrigins = [
    'https://ebay-client.onrender.com',
    'http://localhost:5173',
    'https://ebay-ye10.onrender.com',
    
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
  
app.use('/api/auth',userSwagger ,authRouter);
app.use('/api/cart',cartSwagger, cartRouter);


// swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})