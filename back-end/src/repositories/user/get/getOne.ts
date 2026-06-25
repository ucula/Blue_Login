import myData from "@/externals/userModel";
import { User } from "@/types/user/user";

export default async function getOne(key: keyof User, value: string) {
  return await myData.findOne({ [key]: value });
}
