import myData from "@/externals/userModel";

export default async function updateById(id: string, updatedData: any) {
  return await myData.findByIdAndUpdate(
    id,
    { $set: updatedData },
    { new: true },
  );
}
