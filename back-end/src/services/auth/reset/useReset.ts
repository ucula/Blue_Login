import repo from "@/repositories/index";
import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "@/config";
import { AppError } from "@/utils/express/error";
import { AppSuccess } from "@/utils/express/succes";
import { HttpResponseCode } from "@/types/auth/httpResponseCode";

export default async function useReset(email: string, pass: string) {
  const data = await repo.user.get.getOne("email", email);
  if (!data)
    throw new AppError(HttpResponseCode.NOT_FOUND, "Email does not exist");

  const isMatch = await bcrypt.compare(pass, data.pass);
  if (isMatch)
    throw new AppError(
      HttpResponseCode.BAD_REQUEST,
      "Cannot change to same password",
    );

  pass = await bcrypt.hash(pass, SALT_ROUNDS);

  const filter = { email };
  const updatedData = { pass };

  const db = await repo.user.update.updateOne(filter, updatedData);
  return new AppSuccess(HttpResponseCode.NO_CONTENT, "Success", db);
}
