const app = require("./app");
require('dotenv').config();
const { prisma } = require("./prisma");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
