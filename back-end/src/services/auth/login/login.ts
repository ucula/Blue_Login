import { AUTH_EXPIRES, JWT_SECRET } from "@/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import repo from "@/repositories/index";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppSuccess } from "@/utils/express/succes";
import { AppError } from "@/utils/express/error";

export default async function login(email: string, pass: string) {
  // Check Validation
  try {
    const data = await repo.user.getOne({ email: email });
    if (!data || !data.confirmed) {
      console.log("useLogin: ", email);
      throw new AppError(
        HttpResponseCode.BAD_REQUEST,
        "Wrong Username or Password",
      );
    }

    const isMatch = await bcrypt.compare(pass, data.pass ?? "");
    if (!isMatch) {
      console.log("useLogin: ", pass);
      throw new AppError(
        HttpResponseCode.BAD_REQUEST,
        "Wrong Username or Password",
      );
    }

    // Generate token and return back
    const token = jwt.sign({ id: data._id }, JWT_SECRET, {
      expiresIn: AUTH_EXPIRES,
    });
    return new AppSuccess(HttpResponseCode.OK, "Success", { token });
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
