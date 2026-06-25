import { SALT_ROUNDS } from "@/config";
import repo from "@/repositories/index";
import bcrypt from "bcryptjs";
import { AppError } from "@/utils/express/error";
import { AppSuccess } from "@/utils/express/succes";
import { User } from "@/types/user/user";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";

type error = {
  username?: string;
  email?: string;
};
export async function create(user: User) {
  let data;
  let error: Partial<error> = {};
  data = await repo.user.get.getOne("username", user.username);
  if (data && data.confirmed) error.username = "Username already exists";

  data = await repo.user.get.getOne("email", user.email);
  if (data && data.confirmed) error.email = "Email already exists";

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
    const db = await repo.user.post.post(user);
    return new AppSuccess(HttpResponseCode.CREATED, "Success", db);
  } catch (err: any) {
    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
