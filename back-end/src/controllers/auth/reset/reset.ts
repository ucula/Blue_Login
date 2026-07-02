import { Request, Response } from "express";
import { Payload } from "@/utils/express/response";
import service from "@/services/index";

export default async function reset(req: Request, res: Response) {
  try {
    const { email, pass } = req.body;
    const token = req.query.token as string;
    const response = await service.auth.reset.reset(email, pass, token);
    console.log(response);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.log(err);
    res.status(err.code).json(new Payload(err));
  }
}
