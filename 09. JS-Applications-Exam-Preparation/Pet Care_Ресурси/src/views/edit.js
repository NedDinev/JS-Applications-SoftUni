import { html } from "../../node_modules/lit-html/lit-html.js";
import { editPets, getPetsById } from "../api/pets.js";

const editTemplate = (pet, onSubmit) => html` <section id="editPage">
  <form class="editForm" @submit=${onSubmit}>
    <img src=${pet.image} />
    <div>
      <h2>Edit PetPal</h2>
      <div class="name">
        <label for="name">Name:</label>
        <input name="name" id="name" type="text" value=${pet.name} />
      </div>
      <div class="breed">
        <label for="breed">Breed:</label>
        <input name="breed" id="breed" type="text" value=${pet.breed} />
      </div>
      <div class="Age">
        <label for="age">Age:</label>
        <input name="age" id="age" type="text" value=${pet.age} />
      </div>
      <div class="weight">
        <label for="weight">Weight:</label>
        <input name="weight" id="weight" type="text" value=${pet.weight} />
      </div>
      <div class="image">
        <label for="image">Image:</label>
        <input name="image" id="image" type="text" value=${pet.image} />
      </div>
      <button class="btn" type="submit">Edit Pet</button>
    </div>
  </form>
</section>`;

export async function editPage(ctx) {
  const pet = await getPetsById(ctx.params.id);

  ctx.render(editTemplate(pet, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const pet = {
      name: formData.get("name"),
      breed: formData.get("breed"),
      age: formData.get("age"),
      weight: formData.get("weight"),
      image: formData.get("image"),
    };
    if (!pet.name || !pet.breed || !pet.age || !pet.weight || !pet.image) {
      return alert("All fields are required!");
    }
    await editPets(ctx.params.id, pet);
    e.target.reset();
    ctx.page.redirect("/details/" + ctx.params.id);
  }
}
