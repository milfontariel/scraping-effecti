import { Request, Response } from "express";
import { getBiddingsWithKeyword } from "../services/biddingsService.js";

export async function getBiddings(req: Request, res: Response) {
  const search = req.query.search ? req.query.search : "";

  try {
    const response = await getBiddingsWithKeyword(search);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
