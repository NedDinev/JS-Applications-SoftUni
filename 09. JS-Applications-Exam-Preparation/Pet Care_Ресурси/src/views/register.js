import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/users.js";
import { updateNav } from "../api/utility.js";

const registerTemplate = (onSubmit) => html` <section id="registerPage">
  <form class="registerForm" @submit=${onSubmit}>
    <img src="./images/logo.png" alt="logo" />
    <h2>Register</h2>
    <div class="on-dark">
      <label for="email">Email:</label>
      <input
        id="email"
        name="email"
        type="text"
        placeholder="steven@abv.bg"
        value=""
      />
    </div>
    <div class="on-dark">
      <label for="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="********"
        value=""
      />
    </div>
    <div class="on-dark">
      <label for="repeatPassword">Repeat Password:</label>
      <input
        id="repeatPassword"
        name="repeatPassword"
        type="password"
        placeholder="********"
        value=""
      />
    </div>
    <button class="btn" type="submit">Register</button>
    <p class="field">
      <span>If you have profile click <a href="/login">here</a></span>
    </p>
  </form>
</section>`;

export function registerPage(ctx) {
  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const repassword = formData.get("repeatPassword");
    if (!email || !password || !repassword) {
      return alert("All fields are required!");
    }
    if (password !== repassword) {
      return alert("Passwords don't match");
    }
    await register(email, password);
    updateNav();
    ctx.page.redirect("/");
  }
}
