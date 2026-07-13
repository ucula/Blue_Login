import repo from "@/repositories/index";
import { AppError } from "@/utility/express/error";
import { AppSuccess } from "@/utility/express/succes";
import { User } from "@/types/user/user";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { sendVerificationEmail } from "@/utility/auth/sendEmail";
import { createVerifyToken } from "@/utility/auth/createToken";
import { PATHS } from "@/constants";

type error = {
  username?: string;
  email?: string;
};
export async function create(user: User) {
  let data;
  let error: Partial<error> = {};

  try {
    // Check for duplicated username and email
    data = await repo.admin.getOne({ username: user.username });
    if (data && data.confirmed) error.username = "Username already exists";

    data = await repo.admin.getOne({ email: user.email });
    if (data && data.confirmed) error.email = "Email already exists";

    if (Object.keys(error).length > 0) {
      console.log("error");
      throw new AppError(
        HttpResponseCode.BAD_REQUEST,
        "Validation failed",
        error,
      );
    }

    try {
      await repo.admin.post(user);
      const token = await createVerifyToken(user.email ?? "");
      await sendVerificationEmail(user.email ?? "", token, PATHS.ADD_VERIFY);
    } catch (err) {
      console.log(err);
    }

    return new AppSuccess(HttpResponseCode.CREATED, "Success");
  } catch (err: any) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      HttpResponseCode.INTERNAL_SERVER_ERROR,
      "Database Error",
    );
  }
}
