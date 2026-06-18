import repo from "@/repositories/user/index";
import { User } from "@/types/user";
import bcrypt from "bcryptjs";
import { AppError } from "@/utils/error";
import { AppSuccess } from "@/utils/succes";
import { HttpResponseCode } from "@/types/httpResponseCode";

export async function login(user: User) {
  try {
    const data = await repo.findOne(user);
    if (!data)
      throw new AppError("User does not exist", HttpResponseCode.NOT_FOUND);

    const isMatch = await bcrypt.compare(user.pass, data.pass);
    if (!isMatch)
      throw new AppError("Wrong Password", HttpResponseCode.UNAUTHORIZED);
  } catch (err) {
    throw new AppError(
      "Database Error",
      HttpResponseCode.INTERNAL_SERVER_ERROR,
    );
  }

  return new AppSuccess(HttpResponseCode.OK);
}
