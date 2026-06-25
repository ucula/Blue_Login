import repo from "./src/repositories/index";
import mongoose from "mongoose";

async function main() {
  await mongoose.connect("mongodb://localhost:27017/Blue_Login"); // Guessing connection string, but wait, maybe server.ts has it.
  try {
    const res = await repo.user.list.list();
    console.log("RESULT:", res);
  } catch (err) {
    console.error("ERROR:", err);
  }
  process.exit(0);
}
main();
