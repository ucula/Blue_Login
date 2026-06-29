import userModel from "@/externals/userModel";
import { User } from "@/types/user/user";

export default async function post(user: User) {
  return await userModel.create(user);
}
