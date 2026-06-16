import repo from "../../../repositories/user/index";

export async function update(id: string, updatedData: any) {
  return await repo.update(id, updatedData);
}
