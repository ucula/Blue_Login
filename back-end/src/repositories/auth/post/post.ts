import authModel from "@/externals/authModel";

export default async function post(auth: any) {
  return await authModel.create(auth);
}
