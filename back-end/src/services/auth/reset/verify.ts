import repo from "@/repositories";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utility/express/error";
import { AppSuccess } from "@/utility/express/succes";

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

      const user = await repo.admin.getOne({
        email: String(record.email),
      });
      if (!user) {
        throw new AppError(
          HttpResponseCode.NOT_FOUND,
          "User associated with this token does not exist",
        );
      }
      const email = user.email;
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
