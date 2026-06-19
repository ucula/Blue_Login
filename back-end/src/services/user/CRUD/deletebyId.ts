import repo from "@/repositories/user/index";
import { HttpResponseCode } from "@/types/httpResponseCode";
import { AppError } from "@/utils/error";
import { AppSuccess } from "@/utils/succes";

export async function del(id: string) {
  try {
    await repo.del(id);
    return new AppSuccess(HttpResponseCode.NO_CONTENT);
  } catch (err: any) {
    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
