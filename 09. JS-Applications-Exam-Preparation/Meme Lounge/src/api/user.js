import { setUserData, clearUserData } from "../util.js";
import { get, post } from "./api.js";

const endpoints = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

export async function login(email, password) {
  const {
    _id,
    email: resultEmail,
    accessToken,
    username,
    gender,
  } = await post(endpoints.login, { email, password });

  setUserData({
    _id,
    email: resultEmail,
    accessToken,
    username,
    gender,
  });
}

export async function register(username, email, password, gender) {
  const {
    _id,
    email: resultEmail,
    accessToken,
  } = await post(endpoints.register, { username, email, password, gender });

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
