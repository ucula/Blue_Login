import myData from "@/externals/userModel";
import { User } from "@/types/user";

export async function findOne(key: keyof User, value: string) {
  return await myData.findOne({ [key]: value });
}
