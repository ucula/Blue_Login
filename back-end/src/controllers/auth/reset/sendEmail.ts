import { Request, Response } from "express";
import { Payload } from "@/utils/express/response";
import service from "@/services/index";

export default async function sendEmail(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const response = await service.auth.reset.sendEmail(email);
    console.log(response);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.log(err);
    res.status(err.code).json(new Payload(err));
  }
}
