function solve() {
  const departBtn = document.getElementById("depart");
  const arriveBtn = document.getElementById("arrive");
  const info = document.getElementsByClassName("info")[0];
  let url = `http://localhost:3030/jsonstore/bus/schedule/depot`;
  async function depart() {
    try {
      const response = await fetch(url);
      const data = await response.json();

      info.textContent = `Next stop ${data.name}`;
      departBtn.setAttribute("disabled", "true");
      arriveBtn.removeAttribute("disabled");
    } catch (error) {
      info.textContent = `Error`;
      departBtn.setAttribute("disabled", "true");
      arriveBtn.setAttribute("disabled", "true");
    }
  }

  async function arrive() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      url = `http://localhost:3030/jsonstore/bus/schedule/${data.next}`;

      info.textContent = `Arriving at ${data.name}`;
      arriveBtn.setAttribute("disabled", "true");
      departBtn.removeAttribute("disabled");
    } catch (error) {
      info.textContent = `Error`;
      departBtn.setAttribute("disabled", "true");
      arriveBtn.setAttribute("disabled", "true");
    }
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
