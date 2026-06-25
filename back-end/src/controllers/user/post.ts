import { Request, Response } from "express";
import service from "@/services/index";
import { Payload } from "@/utils/express/response";

export default async function post(req: Request, res: Response) {
  try {
    const user = req.body;
    const response = await service.user.create(user);
    console.log(response);
    res.status(response.code).json(response);
  } catch (err: any) {
    console.log(err);
    res.status(err.code).json(new Payload(err));
  }
}
