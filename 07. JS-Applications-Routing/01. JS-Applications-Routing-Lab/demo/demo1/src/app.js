//detect URL changes and notify application
// -- application start -> window.location.path
// -- back/forward (popstate) -> window.location.path
// -- link navigation -> event.target.href
// change URL on application content swap

const views = {
  "/": () => `<h2>Home Page</h2>`,
  "/catalog": () => `<h2>Catalog</h2>`,
  "/about": () => `<h2>About</h2>`,
};

const main = document.querySelector("main");
document.querySelector("nav").addEventListener(`click`, onNavigate);
window.addEventListener(`popstate`, onPopState);

// Start application in previous view
onPopState();

function onNavigate(event) {
  if (event.target.tagName == `A`) {
    const url = new URL(event.target.href);
    if (showView(url.pathname)) {
      event.preventDefault();

      history.pushState(null, "", url.pathname);
    }
  }
}

function onPopState() {
  const startingView = window.location.pathname;
  showView(startingView);
}

function showView(name) {
  const view = views[name];
  if (typeof view == "function") {
    main.innerHTML = view();
    return true;
  } else {
    return false;
  }
}
