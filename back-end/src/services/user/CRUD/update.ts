import repo from "@/repositories/user/index";
import { HttpResponseCode } from "@/types/httpResponseCode";
import { AppError } from "@/utils/error";
import { AppSuccess } from "@/utils/succes";

export async function update(id: string, updatedData: any) {
  try {
    const data = await repo.updateById(id, updatedData);
    return new AppSuccess(HttpResponseCode.OK, data);
  } catch (err: any) {
    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
