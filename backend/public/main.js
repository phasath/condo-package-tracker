let token = "";
let currentStatus = "PENDING";
let currentId = null;

async function login() {
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value })
  });
  if (!res.ok) return alert("Login inválido");
  const data = await res.json();
  token = data.token;
  login.classList.add("hidden");
  app.classList.remove("hidden");
  load();
}

function tab(status) {
  currentStatus = status;
  document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
  load();
}

async function load() {
  const params = new URLSearchParams({
    status: currentStatus,
    block: filterBlock.value,
    apartment: filterApartment.value,
    name: filterName.value
  });
  const res = await fetch("/packages?" + params, {
    headers: { Authorization: "Bearer " + token }
  });
  const data = await res.json();
  render(data);
}

function render(items) {
  list.innerHTML = "";
  items.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${p.block} - ${p.apartment}</strong>
      <div>${p.code || ""}</div>
      ${
        p.status === "PENDING"
          ? `<button onclick="deliver(${p.id})">Entregar</button>`
          : `<small>✔ ${p.receivedName}</small>`
      }
    `;
    list.appendChild(div);
  });
}

async function deliver(id) {
  const name = prompt("Nome de quem recebeu:");
  if (!name) return;
  await fetch("/packages/" + id + "/deliver", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ name, signature: "" })
  });
  load();
}
