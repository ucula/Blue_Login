import { Request, Response } from "express";
import service from "../../services/user/index";

export async function deleteuserById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const deleted_user = await service.del(id);
    res.status(204).json(deleted_user);
  } catch (error: any) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
}
