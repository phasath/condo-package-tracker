const app = require("./app");
const PORT = process.env.PORT || 3000;
const createAdminIfNotExists = require("./bootstrap/createAdmin");

async function startServer() {
  await createAdminIfNotExists();

  app.listen(PORT, () =>
    console.log("Servidor rodando na porta", PORT)
  );
}

startServer();