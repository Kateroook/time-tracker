const app = require("./app");
require('dotenv').config();
const { prisma } = require("./../prisma/prisma.config");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
