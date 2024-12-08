import {signup,login,getUser ,logout} from '../controller/authController.js';
import express from 'express';

import { verifyToken } from '../middleware/authMiddleware.js';


const authRouter = express.Router();



authRouter.post('/signup',signup);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.get('/get-user',verifyToken,getUser);








export default authRouter;