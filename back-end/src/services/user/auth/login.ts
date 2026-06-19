import repo from "@/repositories/user/index";
import { User } from "@/types/user";
import bcrypt from "bcryptjs";
import { AppError } from "@/utils/error";
import { HttpResponseCode } from "@/types/httpResponseCode";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config";
import { AppSuccess } from "@/utils/succes";

export async function login(user: User) {
  try {
    const data = await repo.findOne(user);
    if (!data)
      throw new AppError(HttpResponseCode.NOT_FOUND, "User does not exist");

    const isMatch = await bcrypt.compare(user.pass, data.pass);
    if (!isMatch)
      throw new AppError(HttpResponseCode.UNAUTHORIZED, "Wrong Password");

    const token = jwt.sign({ id: data._id }, JWT_SECRET, {
      expiresIn: "10m",
    });

    return new AppSuccess(HttpResponseCode.OK, data);
  } catch (err) {
    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
