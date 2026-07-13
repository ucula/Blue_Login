import repo from "@/repositories/index";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utility/express/error";
import { AppSuccess } from "@/utility/express/succes";

export async function getMany(userId: string, year: number, month: number) {
  try {
    const db = await repo.boxForm.getMany({
      user_id: userId,
      "date.year": year,
      "date.month": month,
    });
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
