import { setUserData, clearUserData } from "../util.js";
import { get, post } from "./api.js";
const endpoints = {
  login: "/users/login", // add login endpoint
  register: "/users/register", // add register endpoint
  logout: "/users/logout", // add logout endpoint*/
};
export async function login(email, password) {
  const {
    _id,
    email: resultEmail,
    accessToken,
  } = await post(endpoints.login, { email, password });

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
  } = await post(endpoints.register, { email, password });

  setUserData({
    _id,
    email: resultEmail,
    accessToken,
  });
}

export async function logout() {
  get(endpoints.logout);
  clearUserData();
}
