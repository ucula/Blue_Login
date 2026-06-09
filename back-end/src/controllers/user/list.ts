import { Request, Response } from "express";
import service from "../../services/user/index";

export async function getUser(req: Request, res: Response) {
  try {
    const allData = await service.list();
    res.status(200).json(allData);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Database read failure", error: error.message });
  }
}
