import { SALT_ROUNDS } from "../../../config";
import repo from "../../../repositories/user/index";
import { User } from "../../../types/user";
import bcrypt from "bcryptjs";
import { AppError } from "../../../utils/error";
import { AppSuccess } from "../../../utils/succes";

export async function signup(user: User) {
  user.pass = await bcrypt.hash(user.pass, SALT_ROUNDS);
  try {
    await repo.create(user);
    return new AppSuccess(201);
  } catch (err: any) {
    throw new AppError("Database Error", 500);
  }
}
