import myData from "@/externals/userModel";
import { Auth } from "../../../../front-end/src/types/auth";

export async function updateOne(filter: Auth, data: any) {
  return await myData.findOneAndUpdate(filter, { $set: data }, { new: true });
}
