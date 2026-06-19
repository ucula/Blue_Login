import { Request, Response } from "express";
import service from "@/services/user/index";

export async function updateUserById(req: Request, res: Response) {
  try {
    const { id, updatedData } = req.body;
    const response = await service.CRUD.update(id, updatedData);
    res.status(response.code).json(response.data);
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
}
