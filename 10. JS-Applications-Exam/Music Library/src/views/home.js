import { html } from "../lib.js";

//get Welcome Page from example.html
const homeTemplate = () => html` <section id="home">
  <img src="./images/landing.png" alt="home" />

  <h2 id="landing-text">
    <span>Add your favourite albums</span> <strong>||</strong>
    <span>Discover new ones right here!</span>
  </h2>
</section>`;

//renders home template when called
export function showHome(ctx) {
  ctx.render(homeTemplate());
}
