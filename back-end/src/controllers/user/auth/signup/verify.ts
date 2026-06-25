import { Request, Response } from "express";
import service from "@/services/user/index";
import { Payload } from "@/utils/response/response";

export async function verify(req: Request, res: Response) {
  try {
    const token = req.query.token as string;
    const response = await service.auth.signup.verify(token);
    console.log(response);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.log(err);
    res.status(err.code).json(new Payload(err));
  }
}
