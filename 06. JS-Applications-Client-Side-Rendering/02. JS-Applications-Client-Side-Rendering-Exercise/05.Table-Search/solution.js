import { html, render } from "../node_modules/lit-html/lit-html.js";

async function solve() {
  const respond = await fetch("http://localhost:3030/jsonstore/advanced/table");
  const data = await respond.json();

  const root = document.querySelector(".container tbody");

  const temp = html`${Object.values(data).map((student) => {
    return html`<tr>
      <td>${student.firstName} ${student.lastName}</td>
      <td>${student.email}</td>
      <td>${student.course}</td>
    </tr>`;
  })}`;
  render(temp, root);
  document.querySelector("#searchBtn").addEventListener("click", onClick);

  function onClick() {
    const inputText = document.getElementById("searchField");
    const tableData = root.querySelectorAll("tr");
    inputText.value && searchMatches(inputText);
    function searchMatches(text) {
      tableData.forEach((x) => {
        x.textContent
          .toLocaleLowerCase()
          .includes(text.value.toLocaleLowerCase())
          ? x.classList.add("select")
          : x.classList.remove("select");
      });
      text.value = "";
    }
  }
}
solve();
