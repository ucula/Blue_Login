import repo from "@/repositories/user/index";
import { HttpResponseCode } from "@/types/httpResponseCode";
import { AppError } from "@/utils/response/error";
import { AppSuccess } from "@/utils/succes";

export async function get(id: string) {
  try {
    const db = await repo.get(id);
    return new AppSuccess(HttpResponseCode.OK, "Success", db);
  } catch (err: any) {
    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
