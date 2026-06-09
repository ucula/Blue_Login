import { Request, Response } from "express";
import service from "../../services/user/index";

export async function createUser(req: Request, res: Response) {
  try {
    const user = await service.create(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: "Creation Fail", error: error.message });
  }
}
