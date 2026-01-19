const { execSync } = require("child_process");

async function start() {
  console.log("Rodando migrations...");
  execSync("npx prisma migrate deploy", { stdio: "inherit" });

  console.log("Iniciando servidor...");
  require("./server");
}

start();