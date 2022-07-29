import { Request, Response } from "express";

export async function MUDAR(req: Request, res: Response) {
  try {
    res.send();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
