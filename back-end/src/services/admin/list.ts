import repo from "@/repositories/index";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utils/express/error";
import { AppSuccess } from "@/utils/express/succes";

export async function list() {
  try {
    const db = await repo.user.list();
    return new AppSuccess(HttpResponseCode.OK, "Success", db);
  } catch (err: any) {
    console.error(err);
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
