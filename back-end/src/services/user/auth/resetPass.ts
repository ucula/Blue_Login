import repo from "@/repositories/user/index";
import { User } from "@/types/user";
import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "@/config";
import { AppError } from "@/utils/error";
import { AppSuccess } from "@/utils/succes";
import { HttpResponseCode } from "@/types/httpResponseCode";

export async function resetPass(user: User) {
  try {
    const data = await repo.findOne(user);
    if (!data)
      throw new AppError(HttpResponseCode.NOT_FOUND, "Email does not exist");

    const isMatch = await bcrypt.compare(user.pass, data.pass);
    if (isMatch)
      throw new AppError(
        HttpResponseCode.BAD_REQUEST,
        "Cannot change to same password",
      );

    user.pass = await bcrypt.hash(user.pass, SALT_ROUNDS);
    await repo.updateOne(user);
    return new AppSuccess(HttpResponseCode.NO_CONTENT);
  } catch (err: any) {
    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
