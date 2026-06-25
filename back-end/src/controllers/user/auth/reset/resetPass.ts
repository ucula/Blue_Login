import { Request, Response } from "express";
import { Payload } from "@/utils/response/response";
import service from "@/services/user";

export async function resetPass(req: Request, res: Response) {
  try {
    const { email, pass } = req.body;
    const response = await service.auth.reset.resetPass(email, pass);
    console.log(response);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.log(err);
    res.status(err.code).json(new Payload(err));
  }
}
