import myData from "../../externals/userModel";

export async function list() {
  return await myData.find({});
}
