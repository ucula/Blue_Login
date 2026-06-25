import repo from "@/repositories/user/index";
import { HttpResponseCode } from "@/types/httpResponseCode";
import { AppError } from "@/utils/response/error";
import { AppSuccess } from "@/utils/succes";

export async function del(id: string) {
  try {
    const db = await repo.del(id);
    return new AppSuccess(HttpResponseCode.NO_CONTENT, "Success", db);
  } catch (err: any) {
    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
