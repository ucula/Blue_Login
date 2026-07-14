import { Request, Response } from "express";
import service from "@/services/index";
import { Payload } from "@/utility/express/response";
import sendEmailService from "@/externals/sendEmail";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";

export async function list(req: Request, res: Response) {
  try {
    const response = await service.admin.list();
    res.status(response.code).json(response);
  } catch (err: any) {
    console.error("List users controller error:", err);
    res.status(err.code || HttpResponseCode.INTERNAL_SERVER_ERROR).json(new Payload(err));
  }
}

export async function get(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await service.admin.get(String(id));
    res.status(response.code).json(response);
  } catch (err: any) {
    console.error("Get user controller error:", err);
    res.status(err.code || HttpResponseCode.INTERNAL_SERVER_ERROR).json(new Payload(err));
  }
}

export async function post(req: Request, res: Response) {
  try {
    const user = req.body;
    const response = await service.admin.create(user);
    res.status(response.code).json(response);
  } catch (err: any) {
    console.error("Create user controller error:", err);
    res.status(err.code || HttpResponseCode.INTERNAL_SERVER_ERROR).json(new Payload(err));
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { updatedData } = req.body;
    const response = await service.admin.update(String(id), updatedData);
    res.status(response.code).json(response);
  } catch (err: any) {
    console.error("Update user controller error:", err);
    res.status(err.code || HttpResponseCode.INTERNAL_SERVER_ERROR).json(new Payload(err));
  }
}

export async function del(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await service.admin.del(String(id));
    res.status(response.code).json(response);
  } catch (err: any) {
    console.error("Delete user controller error:", err);
    res.status(err.code || HttpResponseCode.INTERNAL_SERVER_ERROR).json(new Payload(err));
  }
}

export async function sendEmail(req: Request, res: Response) {
  try {
    let { email, path } = req.body;
    const response = await sendEmailService(email, path || "");
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.error("Send verification email controller error:", err);
    res.status(err.code || HttpResponseCode.INTERNAL_SERVER_ERROR).json(new Payload(err));
  }
}

export async function getUserTasks(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { year, month } = req.query;
    const response = await service.user.AmazingBox.getMany(
      String(id),
      parseInt(String(year)),
      parseInt(String(month)),
    );
    res.status(response.code).json(response);
  } catch (err: any) {
    console.error("Get user tasks admin controller error:", err);
    res.status(err.code || HttpResponseCode.INTERNAL_SERVER_ERROR).json(new Payload(err));
  }
}

