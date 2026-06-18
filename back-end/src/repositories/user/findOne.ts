import myData from "@/externals/userModel";

export async function findOne(payload: any) {
  return await myData.findOne({
    $or: [{ email: payload.email }, { username: payload.username }],
  });
}
