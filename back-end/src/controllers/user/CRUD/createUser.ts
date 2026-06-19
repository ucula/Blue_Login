import { Request, Response } from "express";
import service from "@/services/user/index";

export async function createUser(req: Request, res: Response) {
  try {
    const response = await service.CRUD.create(req.body);
    res.status(response.code).send();
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
}
