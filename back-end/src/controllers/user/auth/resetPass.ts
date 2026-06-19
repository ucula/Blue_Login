import { Request, Response } from "express";
import service from "@/services/user/index";
import { HttpResponseCode, ApiResponse } from "@/types/httpResponseCode";

export async function resetPass(
  req: Request,
  res: Response<ApiResponse<HttpResponseCode>>,
) {
  try {
    const response = await service.auth.resetPass(req.body);
    res.status(response.code).send();
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
}
