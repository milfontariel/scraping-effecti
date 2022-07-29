import { Router } from "express";
import { biddingsRouter } from "./biddingsRouter.js";

export const routes = Router();

routes.use(biddingsRouter);
