import repo from "@/repositories/user/index";
import { HttpResponseCode } from "@/types/httpResponseCode";
import { User } from "@/types/user";
import { AppError } from "@/utils/error";
import { AppSuccess } from "@/utils/succes";

export async function verifyValue(key: keyof User, value: string) {
  try {
    const data = await repo.findOne(key, value);
    if (!data)
      throw new AppError(HttpResponseCode.NOT_FOUND, `${key} does not exist`);
    return new AppSuccess(HttpResponseCode.NO_CONTENT);
  } catch (err: any) {
    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
