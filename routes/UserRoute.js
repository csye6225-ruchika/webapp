import express from 'express';
import { createAUser, getSelfUserDetails, updateSelfUserDetails } from '../controllers/UserController.js';
import { validateNoQueryParams } from '../middlewares/CommonMiddleware.js';
import { handleMethodNotAllowed } from '../controllers/CommonMethod.js';
import { validateUserDetails } from '../middlewares/UserMiddleware.js';
import { protectRoute } from '../middlewares/BasicAuthorizationMiddleware.js';

export const userRouter = express.Router();

// endpoint '/'
userRouter.head('/', handleMethodNotAllowed)
userRouter.get('/', handleMethodNotAllowed)

userRouter.post('/', validateNoQueryParams, validateUserDetails , createAUser)

userRouter.put('/', handleMethodNotAllowed)
userRouter.delete('/', handleMethodNotAllowed)
userRouter.patch('/', handleMethodNotAllowed)
userRouter.options('/', handleMethodNotAllowed)

// endpoint '/self'

userRouter.head('/self', handleMethodNotAllowed)

userRouter.get('/self', protectRoute, getSelfUserDetails)
userRouter.put('/self', protectRoute, updateSelfUserDetails)

userRouter.put('/self', handleMethodNotAllowed)
userRouter.delete('/self', handleMethodNotAllowed)
userRouter.patch('/self', handleMethodNotAllowed)
userRouter.options('/self', handleMethodNotAllowed)
