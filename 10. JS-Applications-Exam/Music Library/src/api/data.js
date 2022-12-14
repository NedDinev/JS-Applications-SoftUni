import { del, get, post, put } from "./api.js";

//---------- create application service -------------/
const endpoints = {
  albums: "/data/albums/",
  getAllAlbums: "/data/albums?sortBy=_createdOn%20desc",
  singleAlbum: "/data/albums/",
};

export async function getAllAlbums() {
  return get(endpoints.getAllAlbums); // gets all albums for /catalog
}
export async function createAlbum(data) {
  return post(endpoints.albums, data);
}
export async function deleteAlbumById(id) {
  return del(endpoints.singleAlbum + id);
}
export async function getDetailsById(id) {
  return get(endpoints.singleAlbum + id);
}
export async function updateAlbum(id, data) {
  return put(endpoints.singleAlbum + id, data);
}
