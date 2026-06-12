import repo from "../../repositories/user/index";

export async function getEmail(email: string, isDupe: boolean) {
  const data = await repo.findEmail(email);
  // console.log(data);
  if (data) {
    isDupe = true;
  }
  return isDupe;
}
