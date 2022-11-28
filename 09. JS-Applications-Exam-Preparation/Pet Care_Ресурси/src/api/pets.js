import { del, get, post, put } from "./api.js";

export async function getAllPets() {
    return get('/data/pets?sortBy=_createdOn%20desc&distinct=name');
}

export async function getPetsById(id) {
    return get('/data/pets/' + id);
}

export async function getPets(pets) {
    return post('/data/pets/', pets);
}

export async function editPets(id, pet) {
    return put('/data/pets/' + id, pet);
}

export async function deletePet(id) {
    return del('/data/pets/' + id);
}

export async function petDonation(petId) {
    return post('/data/donation', petId);
}

export async function totalPetDonations(petId)  {
    return get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`)
}

export async function donationFromUser(petId, ownerId)  {
    return get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${ownerId}%22&count`)
}