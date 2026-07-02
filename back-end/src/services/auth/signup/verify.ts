import repo from "@/repositories";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utils/express/error";
import { AppSuccess } from "@/utils/express/succes";

export default async function verify(token: string) {
  if (token) {
    try {
      // Verify the input token (Expired?, is used?)
      const record = await repo.auth.getOne({ token });
      if (!record || record.isUsed) {
        console.log("signupVerify: ", token);
        throw new AppError(
          HttpResponseCode.BAD_REQUEST,
          "Invalid or expired token",
        );
      }

      // Find user that has the same email as the provided token package
      const user = await repo.user.getOne({ email: record.email });
      if (!user) {
        console.log("signupVerify: ", record.email);
        throw new AppError(HttpResponseCode.NOT_FOUND, "User does not exist");
      }

      // Confirm user
      await repo.user.updateById(String(user._id), { confirmed: true });
      // Disable the token and log it
      const response = await repo.auth.updateById(String(record._id), {
        isUsed: true,
      });
      return new AppSuccess(HttpResponseCode.OK, "Verify Success", response);
    } catch (err) {
      console.error("signupVerify: ", err);
      if (err instanceof AppError) {
        throw err;
      }

      throw new AppError(
        HttpResponseCode.INTERNAL_SERVER_ERROR,
        "Database Error",
      );
    }
  }
  throw new AppError(
    HttpResponseCode.BAD_REQUEST,
    "Email or token is required",
  );
}
