import myData from "../../externals/userModel";

export async function create(userData: any) {
  return await myData.create(userData);
}
