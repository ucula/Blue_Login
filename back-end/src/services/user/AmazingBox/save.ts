import repo from "@/repositories/index";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utility/express/error";
import { AppSuccess } from "@/utility/express/succes";

export async function save(
  userId: string,
  year: number,
  month: number,
  boxes: { day: number; value: string }[],
) {
  try {
    await repo.boxForm.bulkUpsert(userId, year, month, boxes);
    return new AppSuccess(HttpResponseCode.OK, "Success");
  } catch (err: any) {
    console.error("Save boxes error:", err);
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
