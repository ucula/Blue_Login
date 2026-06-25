import myData from "@/externals/userModel";

export default async function delById(id: string) {
  return await myData.findByIdAndDelete(id);
}
