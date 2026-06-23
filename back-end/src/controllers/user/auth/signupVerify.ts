import { Request, Response } from "express";
import service from "@/services/user/index";

export async function signupVerify(req: Request, res: Response) {
  try {
    const { token } = req.body;
    console.log("Verify endpoint hit, token:", token);

    const response = await service.auth.signupVerify({ token });
    console.log("Verify success, response code:", response.code);
    res.status(response.code).json({ message: "Success" });
  } catch (error: any) {
    res.status(error.code).json({
      message: error.message,
    });
  }
}
