const app = require("./src/config/app").default;
const { PORT } = require("./src/config/index");

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
