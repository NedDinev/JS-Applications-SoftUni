import { html } from "../lib.js";

//get Welcome Page from example.html
const homeTemplate = () => html` <section id="welcomePage">
  <div id="welcome-message">
    <h1>Welcome to</h1>
    <h1>My Music Application!</h1>
  </div>

  <div class="music-img">
    <img src="./images/musicIcons.webp" />
  </div>
</section>`;

//renders home template when called
export function showHome(ctx) {
  ctx.render(homeTemplate());
}
