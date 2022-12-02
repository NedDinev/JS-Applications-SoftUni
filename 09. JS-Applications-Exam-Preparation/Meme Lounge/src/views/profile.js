import { getUserMemes } from "../api/data.js";
import { html } from "../lib.js";

const cardTemplate = (meme) => html` <div class="user-meme">
  <p class="user-meme-title">${meme.title}</p>
  <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl} />
  <a class="button" href="/catalog/details/${meme._id}">Details</a>
</div>`;

const profileTemplate = (user, profileImg, userMemes) => html` <section
  id="user-profile-page"
  class="user-profile"
>
  <article class="user-info">
    <img
      id="user-avatar-url"
      alt="user-profile"
      src=${profileImg(user.gender)}
    />
    <div class="user-content">
      <p>Username: ${user.username}</p>
      <p>Email: ${user.email}</p>
      <p>My memes count: ${userMemes.length}</p>
    </div>
  </article>
  <h1 id="user-listings-title">User Memes</h1>
  <div class="user-meme-listings">
    <!-- Display : All created memes by this user (If any) -->
    ${userMemes.length > 0
      ? userMemes.map((meme) => cardTemplate(meme))
      : html`<p class="no-memes">No memes in database.</p>`}
  </div>
</section>`;

export async function showProfile(ctx) {
  const user = ctx.user;
  const userMemes = await getUserMemes(user._id);
  console.log(userMemes);
  ctx.render(profileTemplate(user, profileImg, userMemes));

  function profileImg(userGender) {
    if (userGender == "male") {
      return "/images/male.png";
    } else {
      return "/images/female.png";
    }
  }
}
