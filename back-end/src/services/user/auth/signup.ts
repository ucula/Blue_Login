import { SALT_ROUNDS } from "../../../config";
import repo from "../../../repositories/user/index";
import { User } from "../../../types/user";
import bcrypt from "bcryptjs";

export async function signup(user: User) {
  const data = await repo.findOne(user);
  if (data) throw Error("Email exists already");
  if (!user.pass) return;

  user.pass = await bcrypt.hash(user.pass, SALT_ROUNDS);
  await repo.create(user);
}
