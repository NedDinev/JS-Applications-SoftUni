import page from "../node_modules/page/page.mjs";
const main = document.getElementsByTagName("main")[0];

page(`/index.html`, `/`);
page("/", () => (main.innerHTML = `<h2>Home Page</h2>`));
page("/catalog", () => (main.innerHTML = `<h2>Catalog</h2>`));
page("/about", () => (main.innerHTML = `<h2>About</h2>`));
page("*", () => (main.innerHTML = `<h2>404 not found</h2>`));

page.start();
