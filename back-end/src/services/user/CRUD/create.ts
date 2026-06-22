import { SALT_ROUNDS } from "@/config";
import repo from "@/repositories/user/index";
import bcrypt from "bcryptjs";
import { AppError } from "@/utils/error";
import { AppSuccess } from "@/utils/succes";
import { User } from "@/types/user";
import { HttpResponseCode } from "@/types/httpResponseCode";

type error = {
  username?: string;
  email?: string;
};
export async function create(user: User) {
  let data;
  let error: Partial<error> = {};
  data = await repo.findOne("username", user.username);
  if (data) error.username = "Username already exists";

  data = await repo.findOne("email", user.email);
  if (data) error.email = "Email already exists";

  if (Object.keys(error).length > 0) {
    console.log("error");
    throw new AppError(
      HttpResponseCode.BAD_REQUEST,
      "Validation failed",
      error,
    );
  }

  if (!user.pass) {
    user.pass = "1234567890";
  }
  user.pass = await bcrypt.hash(user.pass, SALT_ROUNDS);
  try {
    await repo.create(user);
    return new AppSuccess(201);
  } catch (err: any) {
    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
