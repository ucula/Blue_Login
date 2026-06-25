import { sendVerificationEmail } from "@/utils/sendEmail";
import repo from "@/repositories/user/index";
import { AppError } from "@/utils/response/error";
import { HttpResponseCode } from "@/types/httpResponseCode";
import crypto from "crypto";
import authModel from "@/externals/authModel";
import { AppSuccess } from "@/utils/succes";

export async function sendEmail(email: string) {
  const existingUser = await repo.findOne("email", email);
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
