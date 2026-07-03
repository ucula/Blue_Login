import crypto from "crypto";
import repo from "@/repositories";
import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "@/config";
import { User } from "@/types/user/user";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utils/express/error";
import { AppSuccess } from "@/utils/express/succes";
import { sendVerificationEmail } from "@/utils/auth/sendEmail";

type error = {
  username?: string;
  email?: string;
};

export default async function signup(user: User) {
  let error: Partial<error> = {};
  // Undefined prevent case
  if (!user.pass || !user.email || !user.username) {
    console.log("useSignup: ", user);
    throw new AppError(
      HttpResponseCode.BAD_REQUEST,
      "Missing Pass, Email and Username",
    );
  }

  const userByUsername = await repo.user.getOne({
    username: user.username,
  });

  // Check Dupe with confirmed account
  const userByEmail = await repo.user.getOne({ email: user.email });
  if (userByUsername && userByUsername.confirmed)
    error.username = "Username already exists";

  if (userByEmail && userByEmail.confirmed)
    error.email = "Email already exists";

  if (Object.keys(error).length > 0) {
    throw new AppError(
      HttpResponseCode.BAD_REQUEST,
      "Validation failed",
      error,
    );
  }

  // Delete existing unconfirmed accounts with the same username or email to avoid duplicates
  if (userByUsername && !userByUsername.confirmed) {
    await repo.user.delById(String(userByUsername._id));
  }
  const userByEmailAgain = await repo.user.getOne({ email: user.email });
  if (userByEmailAgain && !userByEmailAgain.confirmed) {
    await repo.user.delById(String(userByEmailAgain._id));
  }

  // Hash password
  user.pass = await bcrypt.hash(user.pass, SALT_ROUNDS);
  try {
    await repo.user.post(user); // post user
    const token = crypto.randomBytes(32).toString("hex");
    await repo.base.updateMany({ email: user.email }, { isUsed: true });
    await repo.auth.post({ email: user.email, token: token });
    await sendVerificationEmail(user.email, token, "/signup/verify"); // send email

    return new AppSuccess(
      HttpResponseCode.NO_CONTENT,
      "Signup Success. Waiting for verification",
    );
  } catch (err: any) {
    console.error("useSignup: ", err);
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
