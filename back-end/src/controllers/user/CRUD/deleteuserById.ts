import { Request, Response } from "express";
import service from "@/services/user/index";

export async function deleteuserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await service.CRUD.del(String(id));
    res.status(response.code).send();
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
}
