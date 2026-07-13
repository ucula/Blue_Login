import adminModel from "@/models/userModel";
import { User } from "@/types/user/user";

const getById = async (id: string) => await adminModel.findById(id);

const getOne = async (filter: any) => await adminModel.findOne(filter);

const list = async () =>
  await adminModel.find(
    {},
    { name: 1, username: 1, email: 1, confirmed: 1, _id: 1 },
  );

const post = async (data: User) => await adminModel.create(data);

const updateById = async (id: string, updatedData: any) =>
  await adminModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true });

const updateOne = async (filter: any, data: any) =>
  await adminModel.findOneAndUpdate(filter, { $set: data }, { new: true });

const delById = async (id: string) => await adminModel.findByIdAndDelete(id);

export default {
  getById,
  getOne,
  list,
  post,
  updateById,
  updateOne,
  delById,
};
