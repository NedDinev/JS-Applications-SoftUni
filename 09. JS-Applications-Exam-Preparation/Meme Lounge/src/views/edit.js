import { updateMeme, getDetailsById } from "../api/data.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (handler, meme) => html` <section id="edit-meme">
  <form @submit=${handler} id="edit-form">
    <h1>Edit Meme</h1>
    <div class="container">
      <label for="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Enter Title"
        name="title"
        .value=${meme.title}
      />
      <label for="description">Description</label>
      <textarea
        id="description"
        placeholder="Enter Description"
        name="description"
        .value=${meme.description}
      >
      </textarea>
      <label for="imageUrl">Image Url</label>
      <input
        id="imageUrl"
        type="text"
        placeholder="Enter Meme ImageUrl"
        name="imageUrl"
        .value=${meme.imageUrl}
      />
      <input type="submit" class="registerbtn button" value="Edit Meme" />
    </div>
  </form>
</section>`;

export async function showEdit(ctx) {
  const meme = await getDetailsById(ctx.params.id);

  ctx.render(editTemplate(createSubmitHandler(onUpdate), meme));

  async function onUpdate(data) {
    const { title, description, imageUrl } = data;

    if (!title || !description || !imageUrl) {
      return alert("all fields are required");
    }

    await updateMeme(ctx.params.id, data);
    ctx.page.redirect("/catalog");
  }
}
