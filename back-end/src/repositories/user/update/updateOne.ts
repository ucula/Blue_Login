import myData from "@/externals/userModel";

export default async function updateOne(filter: any, data: any) {
  return await myData.findOneAndUpdate(filter, { $set: data }, { new: true });
}
