import { Request, Response } from "express";
import service from "@/services/user/index";

export async function getUser(req: Request, res: Response) {
  try {
    const response = await service.CRUD.list();
    res.status(response.code).json(response.data);
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
}
