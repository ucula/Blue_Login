import userModel from "@/externals/userModel";
import { User } from "@/types/user/user";

const getById = async (id: string) => await userModel.findById(id);

const getOne = async (filter: any) => await userModel.findOne(filter);

const list = async () =>
  await userModel.find({}, { name: 1, username: 1, email: 1, confirmed: 1, _id: 1 });

const post = async (data: User) => await userModel.create(data);

const updateById = async (id: string, updatedData: any) =>
  await userModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true });

const updateOne = async (filter: any, data: any) =>
  await userModel.findOneAndUpdate(filter, { $set: data }, { new: true });

const delById = async (id: string) => await userModel.findByIdAndDelete(id);

export default {
  getById,
  getOne,
  list,
  post,
  updateById,
  updateOne,
  delById,
};
