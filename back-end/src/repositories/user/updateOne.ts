import myData from "@/externals/userModel";
import { User } from "@/types/user";

export async function updateOne(user: User) {
  return await myData.findOneAndUpdate(
    { email: user.email },
    { $set: { pass: user.pass } },
  );
}
