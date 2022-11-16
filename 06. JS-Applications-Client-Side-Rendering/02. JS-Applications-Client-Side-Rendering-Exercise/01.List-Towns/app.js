import { html, render } from "../node_modules/lit-html/lit-html.js";

const form = document.getElementsByClassName("content")[0];
form.addEventListener("submit", loadTowns);

function loadTowns(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const [values] = formData.entries();
  const towns = values[1].split(", ");
  renderTownList(towns);
  form.reset();
}

function renderTownList(townsArr) {
  const root = document.getElementById("root");
  const li = html`<ul>
    ${townsArr.map((town) => html`<li>${town}</li>`)}
  </ul>`;
  render(li, root);
}
