import { page, render } from "./lib.js";
import { showHome } from "./views/home.js";

const main = document.getElementById("content");

//routing
page(decorateContext); // uses middleware on every route
page("/", showHome);
page("/catalog", () => console.log("catalog"));
page("/catalog/:id", () => console.log("details"));
page("/edit/:id", () => console.log("edit"));
page("/create", () => console.log("create"));
page("/login", () => console.log("login"));
page("/register", () => console.log("register"));

page.start();

//middleware
function decorateContext(ctx, next) {
  ctx.render = renderMain;

  next();
}

function renderMain(content) {
  render(content, main);
}
