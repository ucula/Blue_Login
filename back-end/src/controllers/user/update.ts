import { Request, Response } from "express";
import service from "../../services/user/index";

export async function updateUserById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const { updatedData } = req.body;
    const edited_user = await service.update(id, updatedData);
    res.status(200).json(edited_user);
  } catch (error: any) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
}
