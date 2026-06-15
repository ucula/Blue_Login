import repo from "../../repositories/user/index";
import { User } from "../../types/user";

export async function getDupe(user: User) {
  const existedUser = await repo.findDupe(user);
  if (existedUser) {
    return {
      isAvailable: false,
      message: "Already registered.",
      user: existedUser,
    };
  }
  return { isAvailable: true, user: existedUser };
}
