import authModel from "@/externals/authModel";

export default async function getOne(token: string) {
  return await authModel.findOne({ token });
}
