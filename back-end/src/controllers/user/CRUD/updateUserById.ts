import { Request, Response } from "express";
import service from "@/services/user/index";
import { Payload } from "@/utils/response/response";

export async function updateUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { updatedData } = req.body;
    const response = await service.CRUD.update(String(id), updatedData);
    console.log(response);
    res.status(response.code).json(response);
  } catch (err: any) {
    console.log(err);
    res.status(err.code).json(new Payload(err));
  }
}
