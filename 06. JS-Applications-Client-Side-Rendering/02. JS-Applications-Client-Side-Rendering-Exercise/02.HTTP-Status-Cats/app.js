import { html, render } from "../node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

let allCats = document.getElementById("allCats");
let ul = html`<ul>
  ${cats.map((obj) => {
    return html` <li>
      <img
        src="./images/${obj.imageLocation}.jpg"
        width="250"
        height="250"
        alt="Card image cap"
      />
      <div class="info">
        <button class="showBtn" @click=${showStatusCode}>
          Show status code
        </button>
        <div class="status" style="display: none" id="${obj.id}">
          <h4>Status Code: ${obj.statusCode}</h4>
          <p>${obj.statusMessage}</p>
        </div>
      </div>
    </li>`;
  })}
</ul>`;
function showStatusCode(event) {
  const status = event.target.parentElement.getElementsByClassName("status")[0];
  if (status.style.display == "none") {
    status.style.display = "block";
    event.target.textContent = "Hide status code";
  } else {
    status.style.display = "none";
    event.target.textContent = "Show status code";
  }
}

render(ul, allCats);
