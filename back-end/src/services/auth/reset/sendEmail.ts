import { sendVerificationEmail } from "@/utils/auth/sendEmail";
import repo from "@/repositories/index";
import { AppError } from "@/utils/express/error";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import crypto from "crypto";
import authModel from "@/externals/authModel";
import { AppSuccess } from "@/utils/express/succes";

export default async function sendEmail(email: string) {
  const existingUser = await repo.user.get.getOne("email", email);
  if (!existingUser)
    throw new AppError(HttpResponseCode.BAD_REQUEST, "Email does not exists");

  try {
    const token = crypto.randomBytes(32).toString("hex");
    await authModel.create({
      userId: existingUser._id,
      token: token,
    });

    const db = await sendVerificationEmail(email, token, "/reset/verify");

    return new AppSuccess(HttpResponseCode.ACCEPTED, "Success", db);
  } catch (err: any) {
    console.error("error:", err);
    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
