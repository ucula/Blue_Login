import repo from "@/repositories/user/index";
import { HttpResponseCode } from "@/types/httpResponseCode";
import { User } from "@/types/user";
import { AppError } from "@/utils/error";
import { AppSuccess } from "@/utils/succes";

export async function verifyValue(
  key: keyof User,
  value: string,
  label: string,
) {
  const data = await repo.findOne(key, value);
  if (label === "login") {
    if (!data)
      throw new AppError(HttpResponseCode.NOT_FOUND, `${key} does not exist`);
  } else if (label === "signup") {
    if (data)
      throw new AppError(HttpResponseCode.BAD_REQUEST, `${key} already exixts`);
  }
  return new AppSuccess(HttpResponseCode.NO_CONTENT);
}
