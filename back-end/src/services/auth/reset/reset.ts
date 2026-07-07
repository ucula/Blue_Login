import repo from "@/repositories/index";
import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "@/config";
import { AppSuccess } from "@/utils/express/succes";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utils/express/error";

export default async function reset(
  email: string,
  pass: string,
  token: string,
) {
  try {
    // Look for user
    const user = await repo.user.getOne({ email: email });
    if (!user) {
      console.log(email);
      throw new AppError(
        HttpResponseCode.BAD_REQUEST,
        "User does not exist",
        email,
      );
    }

    // If user found
    // Hash password and save to database
    pass = await bcrypt.hash(pass, SALT_ROUNDS);
    const filter = { email };
    const updatedData = { pass, confirmed: true };
    const response = await repo.user.updateOne(filter, updatedData);

    // Find the auth record
    const authRecord = await repo.auth.getOne({ token });
    if (!authRecord) {
      console.log(token);
      throw new AppError(
        HttpResponseCode.BAD_REQUEST,
        "Token does not exist in database",
        token,
      );
    }

    // Disable the token
    await repo.auth.updateById(String(authRecord._id), { isUsed: true });

    return new AppSuccess(HttpResponseCode.NO_CONTENT, "Success", {
      response,
    });
  } catch (err: any) {
    console.log("Service:", err);
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
