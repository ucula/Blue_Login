import myData from "@/externals/userModel";

export default async function getById(id: string) {
  return await myData.findById(id);
}
