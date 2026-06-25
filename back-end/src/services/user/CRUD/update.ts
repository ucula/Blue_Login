import repo from "@/repositories/user/index";
import { HttpResponseCode } from "@/types/httpResponseCode";
import { AppError } from "@/utils/response/error";
import { AppSuccess } from "@/utils/succes";

export async function update(id: string, updatedData: any) {
  let data;
  let error: Partial<userError> = {};
  data = await repo.findOne("username", updatedData.username);
  if (data && String(data._id) !== String(id))
    error.username = "Username already exists";

  data = await repo.findOne("email", updatedData.email);
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
    const db = await repo.updateById(id, updatedData);
    return new AppSuccess(HttpResponseCode.OK, "Success", db);
  } catch (err: any) {
    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
