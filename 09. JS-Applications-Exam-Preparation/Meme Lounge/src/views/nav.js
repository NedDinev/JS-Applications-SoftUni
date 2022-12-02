import { logout } from "../api/user.js";
import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";

const nav = document.querySelector("nav");

const navTemplate = (hasUser) =>
  html` ${hasUser
    ? html`<a href="/catalog">All Memes</a>
        <div class="user">
          <a href="/create">Create Meme</a>
          <div class="profile">
            <span>Welcome, ${hasUser.email}</span>
            <a href="/profile">My Profile</a>
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
          </div>
        </div>`
    : html` <a class="active" href="/"> Home Page </a>
        <a href="/catalog">All Memes</a>
        <div class="guest">
          <div class="profile">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
        </div>`}`;

export function updateNav() {
  const user = getUserData();

  render(navTemplate(user), nav);
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
