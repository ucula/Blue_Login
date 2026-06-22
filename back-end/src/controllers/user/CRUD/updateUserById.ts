import { Request, Response } from "express";
import service from "@/services/user/index";

export async function updateUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { updatedData } = req.body;
    const response = await service.CRUD.update(String(id), updatedData);
    res.status(response.code).json(response.data);
  } catch (error: any) {
    res.status(error.code).json({
      message: error.message,
      errors: error.payload,
    });
  }
}
