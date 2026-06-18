import repo from "@/repositories/user/index";

export async function get(id: string) {
  return await repo.get(id);
}
