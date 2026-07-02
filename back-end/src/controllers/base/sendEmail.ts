import { Request, Response } from "express";
import service from "@/services/index";
import { Payload } from "@/utils/express/response";

export default async function sendEmail(req: Request, res: Response) {
  try {
    const { email, path } = req.body;
    const response = await service.base.sendEmail(email, path);
    console.log(response);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.log("Controller: ", err);
    res.status(err.code).json(new Payload(err));
  }
}
