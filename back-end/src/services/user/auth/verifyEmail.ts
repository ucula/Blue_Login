import repo from "@/repositories/user/index";
import { HttpResponseCode } from "@/types/httpResponseCode";
import { AppError } from "@/utils/error";
import { AppSuccess } from "@/utils/succes";

export async function verifyEmail(email: string, type: string) {
  const data = await repo.findOne({ email });
  if (type === "signup") {
    if (data)
      throw new AppError("User already exists", HttpResponseCode.BAD_REQUEST);
    return new AppSuccess(HttpResponseCode.NO_CONTENT);
  }

  if (type === "login") {
    if (!data)
      throw new AppError("Email does not exist", HttpResponseCode.NOT_FOUND);
    return new AppSuccess(HttpResponseCode.NO_CONTENT);
  }
  throw new AppError("Database Error", HttpResponseCode.INTERNAL_SERVER_ERROR);
}
