import { Request, Response } from "express";
import service from "../../../services/user/index";

export async function createUser(req: Request, res: Response) {
  try {
    const response = await service.create(req.body);
    res.status(response.code).send();
  } catch (error: any) {
    res
      .status(error.code || 500)
      .json({ message: error.message, errors: error.errors });
  }
}

