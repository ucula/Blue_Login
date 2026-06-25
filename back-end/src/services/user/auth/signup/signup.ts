import { SALT_ROUNDS } from "@/config";
import repo from "@/repositories/user/index";
import { User } from "@/types/user";
import bcrypt from "bcryptjs";
import { AppError } from "@/utils/response/error";
import { AppSuccess } from "@/utils/succes";
import { HttpResponseCode } from "@/types/httpResponseCode";
import authModel from "@/externals/authModel";
import crypto from "crypto";
import { sendVerificationEmail } from "@/utils/sendEmail";

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
    const createdUser = await repo.create(user);

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
