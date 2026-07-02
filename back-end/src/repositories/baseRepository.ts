import authModel from "@/externals/authModel";

const updateMany = async (filter: any, updatedData: any) => {
  return await authModel.updateMany(filter, { $set: updatedData });
};

export default {
  updateMany,
};
