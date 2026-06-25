import { Request, Response } from "express";
import service from "@/services/index";
import { Payload } from "@/utils/express/response";

export default async function del(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await service.user.del(String(id));
    console.log(response);
    res.status(response.code).json(response);
  } catch (err: any) {
    console.log(err);
    res.status(err.code).json(new Payload(err));
  }
}
