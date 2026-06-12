import myData from "../../externals/userModel";
// Using Mongoose:
export async function findEmail(email: string) {
  return await myData.findOne({ email: email });
}
