import myData from "@/externals/userModel";

export async function list() {
  return await myData.find({}, { name: 1, username: 1, email: 1, _id: 1 });
}
