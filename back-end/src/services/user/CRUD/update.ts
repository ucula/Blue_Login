import repo from "@/repositories/user/index";
import { HttpResponseCode } from "@/types/httpResponseCode";
import { AppError } from "@/utils/error";
import { AppSuccess } from "@/utils/succes";

type error = {
  username?: string;
  email?: string;
};
export async function update(id: string, updatedData: any) {
  let data;
  let error: Partial<error> = {};
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
    const data = await repo.updateById(id, updatedData);
    return new AppSuccess(HttpResponseCode.OK, data);
  } catch (err: any) {
    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
