import { Request, Response } from "express";
import service from "@/services/index";
import { Payload } from "@/utility/express/response";
import sendEmailService from "@/externals/sendEmail";

export async function list(req: Request, res: Response) {
  try {
    const response = await service.admin.list();
    console.log(response);
    res.status(response.code).json(response);
  } catch (err: any) {
    console.log(err);
    res.status(err.code || 500).json(new Payload(err));
  }
}

export async function get(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await service.admin.get(String(id));
    console.log(response);
    res.status(response.code).json(response);
  } catch (err: any) {
    console.log(err);
    res.status(err.code || 500).json(new Payload(err));
  }
}

export async function post(req: Request, res: Response) {
  try {
    const user = req.body;
    const response = await service.admin.create(user);
    console.log(response);
    res.status(response.code).json(response);
  } catch (err: any) {
    console.log(err);
    res.status(err.code || 500).json(new Payload(err));
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { updatedData } = req.body;
    const response = await service.admin.update(String(id), updatedData);
    console.log(response);
    res.status(response.code).json(response);
  } catch (err: any) {
    console.log(err);
    res.status(err.code || 500).json(new Payload(err));
  }
}

export async function del(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await service.admin.del(String(id));
    console.log(response);
    res.status(response.code).json(response);
  } catch (err: any) {
    console.log(err);
    res.status(err.code || 500).json(new Payload(err));
  }
}

export async function sendEmail(req: Request, res: Response) {
  try {
    let { email, path } = req.body;
    const response = await sendEmailService(email, path || "");
    console.log(response);
    res.status(response.code).json(new Payload(response));
  } catch (err: any) {
    console.log(err);
    res.status(err.code || 500).json(new Payload(err));
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
    res.status(err.code || 500).json(new Payload(err));
  }
}

