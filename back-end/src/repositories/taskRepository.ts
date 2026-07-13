import boxFormModel from "@/models/taskModel";

const getOne = async (filter: any) => await boxFormModel.findOne(filter);

const getMany = async (filter: any) => await boxFormModel.find(filter);

const bulkUpsert = async (
  userId: string,
  year: number,
  month: number,
  boxes: { day: number; value: string }[],
) => {
  const operations = boxes.map((box) => ({
    updateOne: {
      filter: {
        user_id: userId,
        "date.year": year,
        "date.month": month,
        "date.day": box.day,
      },
      update: {
        $set: { value: box.value },
      },
      upsert: true,
    },
  }));
  return await boxFormModel.bulkWrite(operations);
};

export default {
  getOne,
  getMany,
  bulkUpsert,
};
