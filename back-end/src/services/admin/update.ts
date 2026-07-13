import repo from "@/repositories/index";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utility/express/error";
import { AppSuccess } from "@/utility/express/succes";

export async function update(id: string, updatedData: any) {
  let data;
  let error: Partial<any> = {};

  try {
    data = await repo.admin.getOne({ username: updatedData.username });
    if (data && String(data._id) !== String(id))
      error.username = "Username already exists";

    data = await repo.admin.getOne({ email: updatedData.email });
    if (data && String(data._id) !== String(id))
      error.email = "Email already exists";

    if (Object.keys(error).length > 0) {
      console.log("error");
      throw new AppError(
        HttpResponseCode.BAD_REQUEST,
        "Validation failed",
        error,
      );
    }

    const db = await repo.admin.updateById(id, updatedData);
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
