import authModel from "@/externals/authModel";
import myData from "@/externals/userModel";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";
import { AppError } from "@/utils/express/error";
import { AppSuccess } from "@/utils/express/succes";

export default async function verify(token: string) {
  if (token) {
    const record = await authModel.findOne({ token });
    if (!record) {
      throw new AppError(
        HttpResponseCode.BAD_REQUEST,
        "Invalid or expired token",
      );
    }

    const user = await myData.findById(record.userId);
    if (!user) {
      throw new AppError(HttpResponseCode.NOT_FOUND, "User not found");
    }

    user.confirmed = true;
    await user.save();

    const db = await authModel.deleteOne({ _id: record._id });

    return new AppSuccess(HttpResponseCode.OK, "Success", db);
  }

  throw new AppError(
    HttpResponseCode.BAD_REQUEST,
    "Email or token is required",
  );
}
