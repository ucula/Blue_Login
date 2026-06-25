import repo from "@/repositories/user/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AppError } from "@/utils/response/error";
import { HttpResponseCode } from "@/types/httpResponseCode";
import { JWT_SECRET } from "@/config";
import { AppSuccess } from "@/utils/succes";

export async function login(email: string, pass: string) {
  const data = await repo.findOne("email", email);
  if (!data)
    throw new AppError(
      HttpResponseCode.NOT_FOUND,
      "Email does not exist",
      "email",
    );

  if (!data.confirmed)
    throw new AppError(
      HttpResponseCode.FORBIDDEN,
      "Unverified account",
      "email",
    );

  const isMatch = await bcrypt.compare(pass, data.pass);
  if (!isMatch) {
    throw new AppError(HttpResponseCode.BAD_REQUEST, "Wrong Password", "pass");
  }

  const token = jwt.sign({ id: data._id }, JWT_SECRET, {
    expiresIn: "30s",
  });

  return new AppSuccess(HttpResponseCode.OK, "Success", { token });
}
