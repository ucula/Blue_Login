import repo from "@/repositories";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utils/express/error";
import { AppSuccess } from "@/utils/express/succes";

export default async function verify(token: string) {
  // Needs token to be able to continue
  if (token) {
    try {
      const record = await repo.auth.getOne({ token });
      if (!record || record.isUsed) {
        console.error("Error:", token);
        throw new AppError(
          HttpResponseCode.BAD_REQUEST,
          "Invalid or expired token",
        );
      }

      const user = await repo.user.getOne({
        email: String(record.email),
      });
      const email = user?.email;
      return new AppSuccess(HttpResponseCode.OK, "Success", { email });
    } catch (err) {
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
  throw new AppError(HttpResponseCode.BAD_REQUEST, "Token is required");
}
