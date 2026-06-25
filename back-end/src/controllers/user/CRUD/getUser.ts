import { Request, Response } from "express";
import service from "@/services/user/index";
import { Payload } from "@/utils/response/response";

export async function getUser(req: Request, res: Response) {
  try {
    const response = await service.CRUD.list();
    console.log(response);
    res.status(response.code).json(response);
  } catch (err: any) {
    console.log(err);
    res.status(err.code).json(new Payload(err));
  }
}
