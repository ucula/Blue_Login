import { SALT_ROUNDS } from "@/config";
import repo from "@/repositories/user/index";
import { User } from "@/types/user";
import bcrypt from "bcryptjs";
import { AppError } from "@/utils/error";
import { AppSuccess } from "@/utils/succes";
import { HttpResponseCode } from "@/types/httpResponseCode";

export async function signup(user: User) {
  user.pass = await bcrypt.hash(user.pass, SALT_ROUNDS);
  try {
    await repo.create(user);
    return new AppSuccess(HttpResponseCode.CREATED);
  } catch (err: any) {
    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
