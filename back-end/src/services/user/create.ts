import repo from "../../repositories/user/index";

export async function create(userData: any) {
  return await repo.create(userData);
}
