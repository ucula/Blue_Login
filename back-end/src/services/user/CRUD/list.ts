import repo from "@/repositories/user/index";
import { HttpResponseCode } from "@/types/httpResponseCode";
import { AppError } from "@/utils/error";
import { AppSuccess } from "@/utils/succes";

export async function list() {
  try {
    const data = await repo.list();
    return new AppSuccess(HttpResponseCode.OK, data);
  } catch (err: any) {
    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
