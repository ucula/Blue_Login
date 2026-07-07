import { SALT_ROUNDS } from "@/config";
import repo from "@/repositories/index";
import bcrypt from "bcryptjs";
import { AppError } from "@/utils/express/error";
import { AppSuccess } from "@/utils/express/succes";
import { User } from "@/types/user/user";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { sendVerificationEmail } from "@/utils/auth/sendEmail";
import { createVerifyToken } from "@/utils/auth/createVerifyToken";

type error = {
  username?: string;
  email?: string;
};
export async function create(user: User) {
  let data;
  let error: Partial<error> = {};

  try {
    // Check for duplicated username and email
    data = await repo.user.getOne({ username: user.username });
    if (data && data.confirmed) error.username = "Username already exists";

    data = await repo.user.getOne({ email: user.email });
    if (data && data.confirmed) error.email = "Email already exists";

    if (Object.keys(error).length > 0) {
      console.log("error");
      throw new AppError(
        HttpResponseCode.BAD_REQUEST,
        "Validation failed",
        error,
      );
    }

    try {
      await repo.user.post(user);
      const token = await createVerifyToken(user.email ?? "");
      await sendVerificationEmail(user.email ?? "", token, "/admin/add/verify");
    } catch (err) {
      console.log(err);
    }

    return new AppSuccess(HttpResponseCode.CREATED, "Success");
  } catch (err: any) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
