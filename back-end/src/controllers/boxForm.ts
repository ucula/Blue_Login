import { Response } from "express";
import service from "@/services/index";
import { Payload } from "@/utility/express/response";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";

export async function get(req: any, res: Response) {
  try {
    const userId = req.user.id;
    const { year, month } = req.query;
    const response = await service.user.AmazingBox.getMany(
      userId,
      parseInt(String(year)),
      parseInt(String(month)),
    );
    res.status(response.code).json(response);
  } catch (err: any) {
    console.error("Get boxes controller error:", err);
    res.status(err.code || HttpResponseCode.INTERNAL_SERVER_ERROR).json(new Payload(err));
  }
}

export async function save(req: any, res: Response) {
  try {
    const userId = req.user.id;
    const { year, month, boxes } = req.body;
    const response = await service.user.AmazingBox.save(
      userId,
      parseInt(String(year)),
      parseInt(String(month)),
      boxes,
    );
    res.status(response.code).json(response);
  } catch (err: any) {
    console.error("Save boxes controller error:", err);
    res.status(err.code || HttpResponseCode.INTERNAL_SERVER_ERROR).json(new Payload(err));
  }
}
