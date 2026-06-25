import { SALT_ROUNDS } from "@/config";
import repo from "@/repositories/index";
import { User } from "@/types/user/user";
import bcrypt from "bcryptjs";
import { AppError } from "@/utils/express/error";
import { AppSuccess } from "@/utils/express/succes";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import authModel from "@/externals/authModel";
import crypto from "crypto";
import { sendVerificationEmail } from "@/utils/auth/sendEmail";

export default async function useSignup(user: User) {
  let error: Record<string, string> = {};

  const existingUsername = await repo.user.get.getOne(
    "username",
    user.username,
  );
  if (existingUsername) error.username = "Username already exists";

  const existingEmail = await repo.user.get.getOne("email", user.email);
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
    const createdUser = await repo.user.post.post(user);

    const token = crypto.randomBytes(32).toString("hex");
    await authModel.create({
      userId: createdUser._id,
      token: token,
    });

    const db = await sendVerificationEmail(user.email, token, "/signup/verify");

    return new AppSuccess(HttpResponseCode.ACCEPTED, "Success", db);
  } catch (err: any) {
    console.error("Signup error:", err);
    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
