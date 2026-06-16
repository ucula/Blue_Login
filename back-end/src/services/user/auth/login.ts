import repo from "../../../repositories/user/index";
import { User } from "../../../types/user";
import bcrypt from "bcryptjs";

export async function login(user: User) {
  const data = await repo.findOne(user);
  if (!data) throw Error("User does not exist");
  if (user.pass === undefined) return;

  const isMatch = await bcrypt.compare(user.pass, data.pass);
  if (!isMatch) throw Error("Wrong Password");

  return;
}
