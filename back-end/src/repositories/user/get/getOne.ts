import myData from "@/externals/userModel";
import { User } from "@/types/user/user";

export default async function getOne(user: User) {
  return await myData.findOne(user);
}
