import repo from "@/repositories";
import { sendVerificationEmail } from "@/utility/auth/sendEmail";
import { AppSuccess } from "@/utility/express/succes";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utility/express/error";
import { createVerifyToken } from "@/utility/auth/createToken";

export default async function sendEmail(email: string, path: string) {
  try {
    const data = await repo.admin.getOne({ email: email });
    if (!data) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return new AppSuccess(HttpResponseCode.NO_CONTENT, "Successfully sent");
    }

    const token = await createVerifyToken(email);
    await sendVerificationEmail(email, token, path);

    return new AppSuccess(HttpResponseCode.NO_CONTENT, "Successfully sent");
  } catch (err: any) {
    console.error("sendAgain: ", err);

    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
