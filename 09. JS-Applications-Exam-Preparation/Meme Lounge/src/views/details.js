import { deleteMemeById, getDetailsById } from "../api/data.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (meme, ctx, onDelete, showBtns) => {
  return html`<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
      <div class="meme-img">
        <img alt="meme-alt" src=${meme.imageUrl} />
      </div>
      <div class="meme-description">
        <h2>Meme Description</h2>
        <p>${meme.description}</p>
        ${showBtns
          ? html`<!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
              <a class="button warning" href="/catalog/edit/${meme._id}"
                >Edit</a
              >
              <button @click=${onDelete} class="button danger">Delete</button>`
          : nothing}
      </div>
    </div>
  </section>`;
};

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const meme = await getDetailsById(id);

  ctx.render(detailsTemplate(meme, ctx, onDelete, showBtns(ctx)));
  async function onDelete() {
    const userConfirm = confirm("are you sure?");
    if (!userConfirm) {
      return;
    }
    await deleteMemeById(id);
    ctx.page.redirect("/catalog");
  }
  function showBtns(ctx) {
    const ownerId = meme._ownerId;
    if (ctx.user != undefined && ownerId == ctx.user._id) {
      return true;
    } else {
      return false;
    }
  }
}
