import authModel from "@/externals/authModel";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utils/express/error";
import { AppSuccess } from "@/utils/express/succes";

export default async function verify(token: string) {
  if (token) {
    const record = await authModel
      .findOne({ token })
      .populate("userId", "email");
    if (!record) {
      throw new AppError(
        HttpResponseCode.BAD_REQUEST,
        "Invalid or expired token",
      );
    }

    const email = (record.userId as any).email;
    await authModel.deleteOne({ _id: record._id });

    return new AppSuccess(HttpResponseCode.OK, "Success", { email });
  }

  throw new AppError(HttpResponseCode.BAD_REQUEST, "Token is required");
}
