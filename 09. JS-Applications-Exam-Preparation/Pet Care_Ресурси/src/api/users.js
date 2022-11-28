import { get, post } from "./api.js";
import { clearUserData, updateNav, setUserData } from "./utility.js";

export async function login(email, password) {
  const user = await post("/users/login", { email, password });
  const data = {
    id: user._id,
    email: user.email,
    accessToken: user.accessToken,
  };
  updateNav();
  setUserData(data);
  return user;
}

export async function register(email, password) {
  const user = await post("/users/register", { email, password });

  const data = {
    id: user._id,
    email: user.email,
    accessToken: user.accessToken,
  };
  updateNav();
  setUserData(data);
  return user;
}

export function logout() {
  get("/users/logout");
  clearUserData();
  updateNav();
}
