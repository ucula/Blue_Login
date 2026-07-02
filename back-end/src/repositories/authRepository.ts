import authModel from "@/externals/authModel";
import type { Auth } from "@/types/auth/auth";

const getOne = async (filter: any) => await authModel.findOne(filter);

const post = async (data: Auth) => await authModel.create(data);

const updateById = async (id: string, updatedData: any) =>
  await authModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true });

export default { getOne, post, updateById };
