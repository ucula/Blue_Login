import myData from "../../externals/userModel";

export async function update(id: string, updatedData: any) {
  return await myData.findByIdAndUpdate(
    id,
    { $set: updatedData },
    { new: true },
  );
}
