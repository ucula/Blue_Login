import { SALT_ROUNDS } from "../../../config";
import repo from "../../../repositories/user/index";
import bcrypt from "bcryptjs";
import { AppError } from "../../../utils/error";
import { AppSuccess } from "../../../utils/succes";

export async function create(user: any) {
  const errors: Record<string, string> = {};

  const byUsername = await repo.findOne({ username: user.username });
  if (byUsername) errors.username = "Username already exists";

  const byEmail = await repo.findOne({ email: user.email });
  if (byEmail) errors.email = "Email already exists";

  if (Object.keys(errors).length > 0) {
    const err = new AppError("Validation failed", 400);
    (err as any).errors = errors;
    throw err;
  }

  if (!user.pass) {
    user.pass = "1234567890";
  }
  user.pass = await bcrypt.hash(user.pass, SALT_ROUNDS);
  try {
    await repo.create(user);
    return new AppSuccess(201);
  } catch (err: any) {
    throw new AppError("Database Error", 500);
  }
}

