import myData from "../../externals/userModel";
import type { User } from "../../types/user";

export async function findDupe(user: User) {
  return await myData.findOne({
    $or: [{ email: user.email }, { username: user.username }],
  });
}
