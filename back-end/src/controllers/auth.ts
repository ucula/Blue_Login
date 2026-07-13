import { Request, Response } from "express";
import service from "@/services/index";
import { Payload } from "@/utility/express/response";

export async function login(req: Request, res: Response) {
  try {
    const { email, pass } = req.body;
    const response = await service.auth.login.login(email, pass);
    console.log(response);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.log("Controller: ", err);
    res.status(err.code || 500).json(new Payload(err));
  }
}

export async function signup(req: Request, res: Response) {
  try {
    const user = req.body;
    const response = await service.auth.signup.signup(user);
    console.log(response);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.log("Controller: ", err);
    res.status(err.code || 500).json(new Payload(err));
  }
}

export async function signupVerify(req: Request, res: Response) {
  try {
    const token = req.query.token as string;
    const response = await service.auth.signup.verify(token);
    console.log(response);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.log("Controller: ", err);
    res.status(err.code || 500).json(new Payload(err));
  }
}

export async function resetVerify(req: Request, res: Response) {
  try {
    const token = req.query.token as string;
    const response = await service.auth.reset.verify(token);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    res.status(err.code || 500).json(new Payload(err));
  }
}

export async function reset(req: Request, res: Response) {
  try {
    const { email, pass } = req.body;
    const token = req.query.token as string;
    const response = await service.auth.reset.reset(email, pass, token);
    console.log(response);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.log(err);
    res.status(err.code || 500).json(new Payload(err));
  }
}
