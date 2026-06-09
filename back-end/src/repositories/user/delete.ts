import myData from "../../externals/userModel";

export async function del(id: string) {
  return await myData.findByIdAndDelete(id);
}
