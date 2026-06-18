import repo from "../../../repositories/user/index";
import { AppError } from "../../../utils/error";
import { AppSuccess } from "../../../utils/succes";

export async function verifyEmail(email: string, type: string) {
  const data = await repo.findOne({ email });
  console.log(data);
  if (type === "signup") {
    if (data) throw new AppError("User already exists", 400);
    return new AppSuccess(204);
  }

  if (type === "login") {
    if (!data) throw new AppError("Email does not exist", 404);
    return new AppSuccess(204);
  }
  throw new AppError("Database Error", 500);
}
