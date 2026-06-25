import { Request, Response } from "express";
import { Payload } from "@/utils/express/response";
import service from "@/services/index";

export default async function useReset(req: Request, res: Response) {
  try {
    const { email, pass } = req.body;
    const response = await service.auth.reset.useReset(email, pass);
    console.log(response);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.log(err);
    res.status(err.code).json(new Payload(err));
  }
}
