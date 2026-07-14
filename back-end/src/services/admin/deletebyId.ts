import repo from "@/repositories/index";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utility/express/error";
import { AppSuccess } from "@/utility/express/succes";

export async function del(id: string) {
  try {
    const db = await repo.admin.delById(id);
    if (!db) {
      throw new AppError(HttpResponseCode.NOT_FOUND, "User not found");
    }
    return new AppSuccess(HttpResponseCode.NO_CONTENT, "Success", db);
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
