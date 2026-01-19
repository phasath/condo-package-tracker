const express = require("express");
const createAdminIfNotExists = require("./bootstrap/createAdmin");

const PORT = process.env.PORT || 3000;

const app = express();

async function startServer() {
  await createAdminIfNotExists();

  app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando na porta", PORT)
  });
}

startServer();

module.exports = app;
