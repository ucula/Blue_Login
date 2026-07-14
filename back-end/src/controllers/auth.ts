import { Request, Response } from "express";
import service from "@/services/index";
import { Payload } from "@/utility/express/response";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";

export async function login(req: Request, res: Response) {
  try {
    const { email, pass } = req.body;
    const response = await service.auth.login.login(email, pass);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.error("Login controller error:", err);
    res.status(err.code || HttpResponseCode.INTERNAL_SERVER_ERROR).json(new Payload(err));
  }
}

export async function signup(req: Request, res: Response) {
  try {
    const user = req.body;
    const response = await service.auth.signup.signup(user);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.error("Signup controller error:", err);
    res.status(err.code || HttpResponseCode.INTERNAL_SERVER_ERROR).json(new Payload(err));
  }
}

export async function signupVerify(req: Request, res: Response) {
  try {
    const token = req.query.token as string;
    const response = await service.auth.signup.verify(token);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.error("SignupVerify controller error:", err);
    res.status(err.code || HttpResponseCode.INTERNAL_SERVER_ERROR).json(new Payload(err));
  }
}

export async function resetVerify(req: Request, res: Response) {
  try {
    const token = req.query.token as string;
    const response = await service.auth.reset.verify(token);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.error("ResetVerify controller error:", err);
    res.status(err.code || HttpResponseCode.INTERNAL_SERVER_ERROR).json(new Payload(err));
  }
}

export async function reset(req: Request, res: Response) {
  try {
    const { email, pass } = req.body;
    const token = req.query.token as string;
    const response = await service.auth.reset.reset(email, pass, token);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.error("Reset password controller error:", err);
    res.status(err.code || HttpResponseCode.INTERNAL_SERVER_ERROR).json(new Payload(err));
  }
}
