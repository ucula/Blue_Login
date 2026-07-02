import crypto from "crypto";
import repo from "@/repositories";
import { sendVerificationEmail } from "@/utils/auth/sendEmail";
import { AppSuccess } from "@/utils/express/succes";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utils/express/error";

export default async function sendEmail(email: string, path: string) {
  try {
    const token = crypto.randomBytes(32).toString("hex");
    await repo.base.updateMany({ email: email }, { isUsed: true });
    await repo.auth.post({ email: email, token: token }); // post token
    await sendVerificationEmail(email, token, `${path}/verify`);

    return new AppSuccess(HttpResponseCode.NO_CONTENT, "Successfully sent");
  } catch (err: any) {
    console.error("sendAgain: ", err);

    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
