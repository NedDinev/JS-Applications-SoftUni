import { html, render } from "./node_modules/lit-html/lit-html.js";
import { contacts } from "./contacts.js";

const renderEl = (contact, root) =>
  render(
    Object.values(contact).map((contact) => {
      return html`
        <div class="contact card">
          <div>
            <i class="far fa-user-circle gravatar"></i>
          </div>
          <div class="info">
            <h2>${contact.name}</h2>
            <button class="detailsBtn" @click=${detailsHandler}>Details</button>
            <div class="details" id=${contact.id}>
              <p>Phone number: ${contact.phoneNumber}</p>
              <p>Email: ${contact.email}</p>
            </div>
          </div>
        </div>
      `;
    }),
    root
  );
renderEl(contacts, document.getElementById("contacts"));
function detailsHandler(e) {
  const details = e.target.parentElement.getElementsByClassName("details")[0];
  details.style.display
    ? (details.style.display = "none")
    : (details.style.display = "block");
}
