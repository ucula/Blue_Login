import app from "./src/config/app";
import { PORT } from "./src/config/index";

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
