import myData from "../../externals/userModel";

export async function get(id: string) {
  return await myData.findById(id);
}
