import { get, post, put, del } from "./api.js";

const endpoints = {
  animals: "/data/pets?sortBy=_createdOn%20desc&distinct=name",
  animalDetails: "/data/pets/",
  postAnimal: "/data/pets",
};

export async function getAll() {
  return get(endpoints.animals);
}

export async function getById(id) {
  return get(endpoints.animalDetails + id);
}

export async function createPostcard(data) {
  return post(endpoints.postAnimal, data);
}

export async function deleteById(id) {
  return del(endpoints.animalDetails + id);
}

export async function editPostcard(id, data) {
  return put(endpoints.animalDetails + id, data);
}
