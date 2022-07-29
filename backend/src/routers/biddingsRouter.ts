import { Router } from "express";
import { getBiddings } from "../controllers/biddingsController.js";

export const biddingsRouter = Router();

biddingsRouter.get("/", getBiddings);
