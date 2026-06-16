import { SALT_ROUNDS } from "../../../config";
import repo from "../../../repositories/user/index";
import bcrypt from "bcryptjs";

export async function create(user: any) {
  user.pass = "1234567890";
  user.pass = await bcrypt.hash(user.pass, SALT_ROUNDS);
  return await repo.create(user);
}
