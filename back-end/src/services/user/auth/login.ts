import repo from "@/repositories/user/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AppError } from "@/utils/error";
import { HttpResponseCode } from "@/types/httpResponseCode";
import { JWT_SECRET } from "@/config";
import { AppSuccess } from "@/utils/succes";

export async function login(email: string, pass: string) {
  const data = await repo.findOne("email", email);
  if (!data)
    throw new AppError(HttpResponseCode.NOT_FOUND, "User does not exist");

  if (!data.confirmed)
    throw new AppError(HttpResponseCode.UNAUTHORIZED, "Unconfirmed account");

  const isMatch = await bcrypt.compare(pass, data.pass);
  if (!isMatch)
    throw new AppError(HttpResponseCode.UNAUTHORIZED, "Wrong Password");

  const token = jwt.sign({ id: data._id }, JWT_SECRET, {
    expiresIn: "30s",
  });

  return new AppSuccess(HttpResponseCode.OK, { token });
}
