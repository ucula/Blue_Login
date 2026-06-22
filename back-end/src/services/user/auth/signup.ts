import { SALT_ROUNDS } from "@/config";
import repo from "@/repositories/user/index";
import { User } from "@/types/user";
import bcrypt from "bcryptjs";
import { AppError } from "@/utils/error";
import { AppSuccess } from "@/utils/succes";
import { HttpResponseCode } from "@/types/httpResponseCode";

export async function signup(user: User) {
  let error: Record<string, string> = {};

  const existingUsername = await repo.findOne("username", user.username);
  if (existingUsername) error.username = "Username already exists";

  const existingEmail = await repo.findOne("email", user.email);
  if (existingEmail) error.email = "Email already exists";

  if (Object.keys(error).length > 0) {
    throw new AppError(
      HttpResponseCode.BAD_REQUEST,
      "Validation failed",
      error,
    );
  }

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
