import repo from "@/repositories";
import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "@/config";
import { User } from "@/types/user/user";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utility/express/error";
import { AppSuccess } from "@/utility/express/succes";
import { sendVerificationEmail } from "@/utility/auth/sendEmail";
import { createVerifyToken } from "@/utility/auth/createToken";
import { PATHS } from "@/constants";

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

  const userByUsername = await repo.admin.getOne({
    username: user.username,
  });

  // Check Dupe with confirmed account
  const userByEmail = await repo.admin.getOne({ email: user.email });
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
    await repo.admin.delById(String(userByUsername._id));
  }
  const userByEmailAgain = await repo.admin.getOne({ email: user.email });
  if (userByEmailAgain && !userByEmailAgain.confirmed) {
    await repo.admin.delById(String(userByEmailAgain._id));
  }

  // Hash password
  user.pass = await bcrypt.hash(user.pass, SALT_ROUNDS);
  try {
    await repo.admin.post(user); // post user
    const token = await createVerifyToken(user.email ?? "");
    await sendVerificationEmail(user.email ?? "", token, PATHS.SIGNUP_VERIFY); // send email

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
