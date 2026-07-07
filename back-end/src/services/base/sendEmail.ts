import repo from "@/repositories";
import { sendVerificationEmail } from "@/utils/auth/sendEmail";
import { AppSuccess } from "@/utils/express/succes";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utils/express/error";
import { createVerifyToken } from "@/utils/auth/createVerifyToken";

export default async function sendEmail(email: string, path: string) {
  try {
    const data = await repo.user.getOne({ email: email });
    if (!data) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return new AppSuccess(HttpResponseCode.NO_CONTENT, "Successfully sent");
    }

    const token = await createVerifyToken(email);
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
