import repo from "@/repositories/index";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utils/express/error";
import { AppSuccess } from "@/utils/express/succes";

export async function update(id: string, updatedData: any) {
  let data;
  let error: Partial<any> = {};
  data = await repo.user.get.getOne("username", updatedData.username);
  if (data && String(data._id) !== String(id))
    error.username = "Username already exists";

  data = await repo.user.get.getOne("email", updatedData.email);
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
  try {
    const db = await repo.user.update.updateById(id, updatedData);
    return new AppSuccess(HttpResponseCode.OK, "Success", db);
  } catch (err: any) {
    console.error(err);
    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
