import authModel from "@/externals/authModel";

export default async function updateById(id: string, updatedData: any) {
  return await authModel.findByIdAndUpdate(
    id,
    updatedData,
    { new: true },
  );
}
