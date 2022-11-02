function getInfo() {
  const stopId = document.getElementById("stopId").value;
  const stopName = document.getElementById("stopName");
  const buses = document.getElementById("buses");

  fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      stopName.textContent = "";
      stopName.textContent = data.name;
      buses.innerHTML = "";
      for (const [key, value] of Object.entries(data.buses)) {
        const li = document.createElement("li");
        li.textContent = `Bus ${key} arrives in ${value} minutes`;
        buses.appendChild(li);
      }
    })
    .catch((err) => {
      stopName.textContent = "Error";
      buses.innerHTML = "";
    });
}
