function attachEvents() {
  const phoneBook = document.getElementById("phonebook");
  const btnLoad = document.getElementById("btnLoad");
  const personInput = document.getElementById("person");
  const phoneInput = document.getElementById("phone");
  const btnCreate = document.getElementById("btnCreate");

  btnLoad.addEventListener("click", load);
  async function load() {
    const url = `http://localhost:3030/jsonstore/phonebook`;
    const response = await fetch(url);
    const data = await response.json();
    phoneBook.innerHTML = "";
    Object.values(data).forEach((contact) => {
      const newLi = document.createElement("li");
      newLi.textContent = `${contact.person}: ${contact.phone}`;
      phoneBook.appendChild(newLi);
    });
  }
  async function create() {
    const url = `http://localhost:3030/jsonstore/phonebook`;
  }
}

attachEvents();
