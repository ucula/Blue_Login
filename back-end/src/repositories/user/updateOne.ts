import myData from "@/externals/userModel";
import { User } from "@/types/user";
import { AppError } from "@/utils/error";

export async function updateOne(user: User) {
  const { email, pass } = user;
  try {
    const response = await myData.findOneAndUpdate(
      { email: email },
      { $set: { pass: pass } },
    );
  } catch (err: any) {
    throw new AppError("Server Error", 500);
  }
}
