import { Request, Response } from "express";
import service from "../../services/user/index";

export async function createUser(req: Request, res: Response) {
  try {
    // console.log("hi");
    // 1. Check if user already exists
    const { email, pass } = req.body;
    const existingEmail = await service.findExistEmail(email);
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 2. Otherwise, create the user
    const user = await service.create(req.body);
    res.status(201).json(user); // 201 created
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Creation Fail" }); // database problem
  }
}
