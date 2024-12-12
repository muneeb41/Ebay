import express from 'express';
import { addToCart , removeFromCart ,clearCart ,getCarts , updateCart} from '../controller/cartController.js';
import { verifyToken } from '../middleware/authMiddleware.js';


const cartRouter = express.Router();

cartRouter.post('/addToCart',verifyToken,addToCart);
cartRouter.delete('/removeFromCart/:id',verifyToken,removeFromCart);
cartRouter.delete('/clearCart',verifyToken,clearCart);
cartRouter.get('/getCarts',verifyToken,getCarts);
cartRouter.patch('/update/:id',verifyToken,updateCart);



export default cartRouter