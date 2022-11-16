import { html, render } from "../node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

render(
  html`<ul>
    ${towns.map((town) => html`<li>${town}</li>`)}
  </ul>`,
  document.getElementById("towns")
);

document.querySelector("button").addEventListener("click", search);

function search() {
  const searchInput = document.getElementById("searchText").value.toLowerCase();
  const townsList = document.querySelectorAll("#towns ul li");
  const matches = [];

  Array.from(townsList).forEach((li) => {
    if (
      li.textContent.toLowerCase().includes(searchInput) &&
      searchInput != ""
    ) {
      li.classList.add("active");
      matches.push(li.textContent);
    } else {
      li.classList.remove("active");
    }
  });
  matches.length > 0
    ? (document.getElementById(
        "result"
      ).textContent = `${matches.length} matches found`)
    : (document.getElementById("result").textContent = "");
}
