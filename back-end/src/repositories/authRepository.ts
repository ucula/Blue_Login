import authModel from "@/models/authModel";
import type { Auth } from "@/types/auth/auth";

const getOne = async (filter: any) => await authModel.findOne(filter);

const post = async (data: Auth) => await authModel.create(data);

const updateById = async (id: string, updatedData: any) =>
  await authModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true });

const updateMany = async (filter: any, updatedData: any) => {
  return await authModel.updateMany(filter, { $set: updatedData });
};

export default { getOne, post, updateById, updateMany };
