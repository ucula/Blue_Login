import { Request, Response } from "express";
import service from "@/services/user/index";
import { Payload } from "@/utils/response/response";

export async function signup(req: Request, res: Response) {
  try {
    const user = req.body;
    const response = await service.auth.signup.signup(user);
    console.log(response);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.log(err);
    res.status(err.code).json(new Payload(err));
  }
}
