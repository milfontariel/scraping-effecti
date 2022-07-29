import { Router } from "express";
import {
  getBiddings,
  getBiddingPage,
} from "../controllers/biddingsController.js";

export const biddingsRouter = Router();

biddingsRouter.get("/", getBiddings);
biddingsRouter.get("/bidding/:ref", getBiddingPage);
