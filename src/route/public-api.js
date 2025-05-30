import express from "express";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();

publicRouter.post('/api/accounts', userController.register);
publicRouter.post('/api/accounts/login', userController.login);

export {publicRouter};