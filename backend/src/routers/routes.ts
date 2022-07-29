import { Router } from "express";
import { authRouter } from "./authRouter.js";

export const routes = Router();

routes.use(authRouter);
