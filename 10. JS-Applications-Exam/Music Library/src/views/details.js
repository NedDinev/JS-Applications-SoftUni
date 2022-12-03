import { deleteAlbumById, getDetailsById } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { getLikes, getOwnLikes, like } from "../api/likes.js";

const detailsTemplate = (
  album,
  isOwner,
  onDelete,
  onLike,
  likes,
  canLike,
  hasUser
) => html` <section id="details">
  <div id="details-wrapper">
    <p id="details-title">Album Details</p>
    <div id="img-wrapper">
      <img src=${album.imageUrl} alt="example1" />
    </div>
    <div id="info-wrapper">
      <p>
        <strong>Band:</strong><span id="details-singer">${album.singer}</span>
      </p>
      <p>
        <strong>Album name:</strong
        ><span id="details-album">${album.album}</span>
      </p>
      <p>
        <strong>Release date:</strong
        ><span id="details-release">${album.release}</span>
      </p>
      <p>
        <strong>Label:</strong><span id="details-label">${album.label}</span>
      </p>
      <p>
        <strong>Sales:</strong><span id="details-sales">${album.sales}</span>
      </p>
    </div>
    <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

    ${hasUser
      ? html` <div id="action-buttons">
          ${canLike
            ? html` <a @click=${onLike} href="javascript:void(0)" id="like-btn"
                >Like</a
              >`
            : nothing}
          ${isOwner
            ? html`<a href="/edit/${album._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn"
                  >Delete</a
                >`
            : nothing}
        </div>`
      : nothing}
  </div>
</section>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const requests = [getDetailsById(id), getLikes(id)];

  const hasUser = Boolean(ctx.user);
  if (hasUser) {
    requests.push(getOwnLikes(id, ctx.user._id));
  }
  const [album, likes, hasLike] = await Promise.all(requests);
  const isOwner = album._ownerId === ctx.user._id;
  const canLike = !isOwner && hasLike == 0;
  ctx.render(
    detailsTemplate(album, isOwner, onDelete, onLike, likes, canLike, hasUser)
  );
  async function onDelete() {
    const userConfirm = confirm("are you sure?");
    if (!userConfirm) {
      return;
    }
    await deleteAlbumById(id);
    ctx.page.redirect("/catalog");
  }
  async function onLike() {
    await like(id);
    ctx.page.redirect("/details/" + id);
  }
}
