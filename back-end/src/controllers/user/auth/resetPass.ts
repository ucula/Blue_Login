import { Request, Response } from "express";
import service from "@/services/user/index";
import { HttpResponseCode, ApiResponse } from "@/types/httpResponseCode";

export async function resetPass(
  req: Request,
  res: Response<ApiResponse<HttpResponseCode>>,
) {
  try {
    const { email, pass } = req.body;
    const response = await service.auth.resetPass(email, pass);
    res.status(response.code).send();
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
}
