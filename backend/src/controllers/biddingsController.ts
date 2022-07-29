import { Request, Response } from "express";
import {
  getBiddingsWithKeyword,
  loadBidding,
} from "../services/biddingsService.js";

export async function getBiddings(req: Request, res: Response) {
  const search = req.query.search;

  try {
    const response = await getBiddingsWithKeyword(search);
    if (response.data === "nada encontrado") {
      res.sendStatus(500);
    }
    res.send(response);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getBiddingPage(req: Request, res: Response) {
  const { ref } = req.params;

  if (!ref) {
    res.sendStatus(422);
  }

  try {
    const response = await loadBidding(ref);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
