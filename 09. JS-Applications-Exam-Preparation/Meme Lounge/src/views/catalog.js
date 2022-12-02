import { html, nothing } from "../lib.js";
import { getAllMemes } from "../api/data.js";

const cardTemplate = (meme) => html`<div class="meme">
  <div class="card">
    <div class="info">
      <p class="meme-title">${meme.title}</p>
      <img class="meme-image" alt="meme-img" src=${meme.imageUrl} />
    </div>

    <div id="data-buttons">
      <a class="button" href="/catalog/details/${meme._id}">Details</a>
    </div>
  </div>
</div>`;

const catalogTemplate = (memes) => html` <section id="meme-feed">
  <h1>All Memes</h1>
  <div id="memes">
    ${memes.length > 0
      ? memes.map((meme) => cardTemplate(meme))
      : html` <!--No memes in catalog-->
          <p class="no-memes">No memes in database.</p>`}
  </div>
</section>`;

export async function showCatalog(ctx) {
  const allMemes = await getAllMemes();

  ctx.render(catalogTemplate(allMemes));
}
