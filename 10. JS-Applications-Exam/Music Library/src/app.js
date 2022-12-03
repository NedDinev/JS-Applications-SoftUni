/**
 * Import views
 */
import { updateNav } from "./views/nav.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";

// get main element for render
const main = document.querySelector("main");

//attached middle ware
page(decorateContext);
page("/", showHome);
page("/home", showHome);
page("/login", showLogin);
page("/register", showRegister);
page("/catalog", showCatalog);
page("/create", showCreate);
page("/details/:id", showDetails);
page("/edit/:id", showEdit);
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
