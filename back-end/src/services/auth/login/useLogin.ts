import repo from "@/repositories/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AppError } from "@/utils/express/error";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AUTH_EXPIRES, JWT_SECRET } from "@/config";
import { AppSuccess } from "@/utils/express/succes";

export default async function useLogin(email: string, pass: string) {
  const data = await repo.user.get.getOne("email", email);
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
    expiresIn: AUTH_EXPIRES,
  });

  return new AppSuccess(HttpResponseCode.OK, "Success", { token });
}
