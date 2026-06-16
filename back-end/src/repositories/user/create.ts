import myData from "../../externals/userModel";
import { User } from "../../types/user";

export async function create(user: User) {
  return await myData.create(user);
}
