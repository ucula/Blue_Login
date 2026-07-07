import crypto from "crypto";
import repo from "@/repositories/index";

export async function createVerifyToken(email: string): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  await repo.base.updateMany({ email }, { isUsed: true });
  await repo.auth.post({ email, token });
  return token;
}
