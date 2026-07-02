import crypto from "crypto";
import repo from "@/repositories/index";
import { sendVerificationEmail } from "@/utils/auth/sendEmail";
import { AppError } from "@/utils/express/error";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppSuccess } from "@/utils/express/succes";

export default async function sendEmail(email: string) {
  // Check for existing email. If user does not exist, set time out to fake sending.
  try {
    const data = await repo.user.getOne({ email: email });
    if (!data || !data.confirmed) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return new AppSuccess(HttpResponseCode.OK, "Success");
    }

    // If user exists, send actual email
    // Create auth document
    const token = crypto.randomBytes(32).toString("hex");
    await repo.auth.post({ email: email, token: token });

    // Send email verification
    const response = await sendVerificationEmail(email, token, "/reset/verify");
    return new AppSuccess(HttpResponseCode.OK, "Success", response);
  } catch (err: any) {
    console.error("Service: ", err);
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
