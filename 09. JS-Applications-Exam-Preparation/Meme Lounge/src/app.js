/**
 * Import views
 */

import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { updateNav } from "./views/nav.js";
import { showProfile } from "./views/profile.js";
import { showRegister } from "./views/register.js";

// get main element for render
const main = document.querySelector("main");

//attached middle ware
page(decorateContext);
page("/", showHome);
page("/home", showHome);
page("/login", showLogin);
page("/register", showRegister);
page("/create", showCreate);
page("/catalog", showCatalog);
page("/catalog/details/:id", showDetails);
page("/catalog/edit/:id", showEdit);
page("/profile", showProfile);

//create page routing

updateNav();
page.start();

function decorateContext(ctx, next) {
  ctx.render = renderMain;
  ctx.updateNav = updateNav;

  const user = getUserData();
  if (user) {
    ctx.user = user;
  }

  next();
}

function renderMain(content) {
  render(content, main);
}
