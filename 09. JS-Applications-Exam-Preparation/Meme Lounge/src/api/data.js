import { del, get, post, put } from "./api.js";

const endpoints = {
  memes: "/data/memes",
  getAllMemes: "/data/memes?sortBy=_createdOn%20desc",
  singleMeme: "/data/memes/",
};

//---------- create application service -------------/
export async function getAllMemes() {
  return get(endpoints.getAllMemes); // gets all albums for /catalog
}

export async function createMeme(data) {
  return post(endpoints.memes, data);
}

export async function getDetailsById(id) {
  return get(endpoints.singleMeme + id);
}

export async function deleteMemeById(id) {
  return del(endpoints.singleMeme + id);
}

export async function updateMeme(id, data) {
  return put(endpoints.singleMeme + id, data);
}
export async function getUserMemes(id) {
  return get(
    `/data/memes?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`
  );
}
