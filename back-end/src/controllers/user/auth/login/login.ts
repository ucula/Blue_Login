import { Request, Response } from "express";
import service from "@/services/user/index";
import { Payload } from "@/utils/response/response";

export async function login(req: Request, res: Response) {
  try {
    const { email, pass } = req.body;
    const response = await service.auth.login.login(email, pass);
    console.log(response);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.log(err);
    res.status(err.code).json(new Payload(err));
  }
}
