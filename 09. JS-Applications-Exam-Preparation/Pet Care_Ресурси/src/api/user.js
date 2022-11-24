import { clearUserData, setUserData } from "../util.js";
import { get, post } from "./api.js";

export async function login(email, password) {
  const {
    _id,
    email: resultEmail,
    accessToken,
  } = await post("/users/login", { email, password }); // destructured data from request

  setUserData({
    _id,
    email: resultEmail,
    accessToken,
  });
}

export async function register(email, password) {
  const {
    _id,
    email: resultEmail,
    accessToken,
  } = await post("/users/register", { email, password }); // destructured data from request

  setUserData({
    _id,
    email: resultEmail,
    accessToken,
  });
}

export async function logout(email, password) {
  get("/users/logout");
  clearUserData();
}
