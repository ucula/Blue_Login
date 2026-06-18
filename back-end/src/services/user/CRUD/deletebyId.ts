import repo from "@/repositories/user/index";

export async function del(id: string) {
  return await repo.del(id);
}
