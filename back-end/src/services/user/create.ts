import { SALT_ROUNDS } from "@/config";
import repo from "@/repositories/index";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { AppError } from "@/utils/express/error";
import { AppSuccess } from "@/utils/express/succes";
import { User } from "@/types/user/user";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { sendVerificationEmail } from "@/utils/auth/sendEmail";

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

    if (!user.pass) {
      user.pass = crypto.randomBytes(32).toString("hex");
    }
    user.pass = await bcrypt.hash(user.pass, SALT_ROUNDS);

    try {
      const token = crypto.randomBytes(32).toString("hex");
      await repo.user.post(user);
      await repo.auth.post({ email: user.email, token: token });
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
