import crypto from "crypto";
import repo from "@/repositories";
import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "@/config";
import { User } from "@/types/user/user";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utils/express/error";
import { AppSuccess } from "@/utils/express/succes";
import { sendVerificationEmail } from "@/utils/auth/sendEmail";

export default async function signup(user: User) {
  // Undefined prevent case
  if (!user.pass || !user.email || !user.username) {
    console.log("useSignup: ", user);
    throw new AppError(
      HttpResponseCode.BAD_REQUEST,
      "Missing Pass, Email and Username",
    );
  }

  // Username, Email Duplicate check
  const existingUsername = await repo.user.getOne({
    username: user.username,
  });
  const existingEmail = await repo.user.getOne({ email: user.email });
  if (existingUsername || existingEmail) {
    console.log("useSignup: ", user.email);
    throw new AppError(
      HttpResponseCode.BAD_REQUEST,
      "Username or Email already exists",
    );
  }

  // Hash password
  user.pass = await bcrypt.hash(user.pass, SALT_ROUNDS);

  // Create a User(Unverified) and send email
  try {
    const token = crypto.randomBytes(32).toString("hex");
    await repo.user.post(user); // post user
    await repo.auth.post({ email: user.email, token: token }); // post token
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
