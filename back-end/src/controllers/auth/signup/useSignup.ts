import { Request, Response } from "express";
import service from "@/services/index";
import { Payload } from "@/utils/express/response";

export default async function useSignup(req: Request, res: Response) {
  try {
    const user = req.body;
    const response = await service.auth.signup.useSignup(user);
    console.log(response);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.log("Controller: ", err);
    res.status(err.code).json(new Payload(err));
  }
}
