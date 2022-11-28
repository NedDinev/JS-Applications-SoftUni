import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deletePet,
  donationFromUser,
  getPetsById,
  petDonation,
  totalPetDonations,
} from "../api/pets.js";
import { getUserData } from "../api/utility.js";

const detailsTemplate = (
  pet,
  isOwner,
  onDelete,
  donationsCount
) => html` <section id="detailsPage">
  <div class="details">
    <div class="animalPic">
      <img src=${pet.image} />
    </div>
    <div>
      <div class="animalInfo">
        <h1>Name: ${pet.name}</h1>
        <h3>Breed: ${pet.breed}</h3>
        <h4>Age: ${pet.age}</h4>
        <h4>Weight: ${pet.weight}</h4>
        <h4 class="donation">Donation: $</h4>
      </div>
      <div class="actionBtn">
        ${isOwner
          ? html`<a href="/edit/${pet._id}" class="edit">Edit</a>
              <a href="javascript:void(0)" @click=${onDelete} class="remove"
                >Delete</a
              > `
          : ""}
      </div>
    </div>
  </div>
</section>`;

export async function detailsPage(ctx) {
  const pet = await getPetsById(ctx.params.id);
  const user = getUserData();
  const isOwner = user?._id === pet._ownerId;
  const isLogged = user !== undefined;
  let donationsCount;
  let userDonated;

  if (user) {
    userDonated = await donationFromUser(ctx.params.id, ctx.params._id);
  }
  donationsCount = await totalPetDonations(ctx.params.id);
  ctx.render(
    detailsTemplate(
      pet,
      isOwner,
      onDelete,
      isLogged,
      donationsCount,
      onClickDonate,
      userDonated
    )
  );

  async function onClickDonate(e) {
    const donate = {
      pet,
    };
    e.target.style.display = "none";
    await petDonation(donate);
  }
  donationsCount = await totalPetDonations(ctx.params.id);
  userDonated = await donationFromUser(ctx.params.id, ctx.params._id);
  ctx.render(
    detailsTemplate(
      pet,
      isOwner,
      onDelete,
      isLogged,
      donationsCount,
      onClickDonate,
      userDonated
    )
  );

  async function onDelete() {
    const dialog = confirm("Are you sure you want to delete this article?");

    if (dialog) {
      await deletePet(ctx.params.id);
      ctx.page.redirect("/");
    }
  }
}
