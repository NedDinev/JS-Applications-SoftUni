import { html, render } from "../node_modules/lit-html/lit-html.js";
const url = "http://localhost:3030/jsonstore/advanced/dropdown";

window.addEventListener("load", loadData);
document.querySelector("form").addEventListener("submit", addItem);

async function loadData() {
  const respond = await fetch(url);
  const data = await respond.json();
  render(
    html`${Object.values(data).map((x) => {
      return html`<option value=${x._id}>${x.text}</option>`;
    })}`,
    document.getElementById("menu")
  );
}

async function addItem(event) {
  event.preventDefault();

  const formInput = document.getElementById("itemText").value;

  const body = {
    text: formInput,
  };

  const headers = getHeaders("POST", body);
  const post = await fetch(url, headers);

  loadData();
  event.target.reset();
}
function getHeaders(method, body) {
  let request = {
    method: `${method}`,
  };
  if (method != "GET") {
    request.header = {
      "Content-Type": "application/json",
    };
    request.body = JSON.stringify(body);
  }

  return request;
}
