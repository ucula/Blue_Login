import repo from "../../../repositories/user/index";
import { User } from "../../../types/user";
import bcrypt from "bcryptjs";
import { AppError } from "../../../utils/error";

export async function login(user: User) {
  const data = await repo.findOne(user);
  if (!data) throw new AppError("User does not exist", 404);

  const isMatch = await bcrypt.compare(user.pass, data.pass);
  if (!isMatch) throw new AppError("Wrong Password", 401);

  return data;
}
