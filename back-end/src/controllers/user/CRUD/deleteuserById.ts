import { Request, Response } from "express";
import service from "@/services/user/index";

export async function deleteuserById(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const response = await service.CRUD.del(id);
    res.status(response.code).json(response.data);
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
}
