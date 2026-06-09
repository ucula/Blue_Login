import repo from "../../repositories/user/index";

export async function list() {
  return await repo.list();
}
