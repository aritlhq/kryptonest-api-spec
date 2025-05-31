import express from "express";
import {authMiddleware} from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";

const userRouter = new express.Router();

// User API route
userRouter.use(authMiddleware);
userRouter.get('/api/accounts/me', userController.get);

export {userRouter};