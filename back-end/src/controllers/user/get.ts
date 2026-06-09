import { Request, Response } from "express";
import service from "../../services/user/index";

export async function getUserById(req: Request, res: Response) {
  try {
    const dataId = req.params.id as string;
    const data = await service.get(dataId);
    res.status(200).json(data);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Database read failure", error: error.message });
  }
}
