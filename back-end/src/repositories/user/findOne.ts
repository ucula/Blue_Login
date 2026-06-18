import myData from "../../externals/userModel";
import type { User } from "../../types/user";
import { AppError } from "../../utils/error";

export async function findOne(payload: any) {
  return await myData.findOne({
    $or: [{ email: payload.email }, { username: payload.username }],
  });
}
