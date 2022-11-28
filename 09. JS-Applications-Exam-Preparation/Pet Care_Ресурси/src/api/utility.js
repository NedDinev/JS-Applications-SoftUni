export function getUserData() {
  return JSON.parse(localStorage.getItem("user"));
}

export function setUserData(data) {
  localStorage.setItem("user", JSON.stringify(data));
}

export function clearUserData() {
  localStorage.removeItem("user");
}

export function updateNav() {
  const user = getUserData();
  if (user) {
    document
      .querySelectorAll(".user")
      .forEach((e) => (e.style.display = "block"));
    document
      .querySelectorAll(".guest")
      .forEach((e) => (e.style.display = "none"));
  } else {
    document
      .querySelectorAll(".user")
      .forEach((e) => (e.style.display = "none"));
    document
      .querySelectorAll(".guest")
      .forEach((e) => (e.style.display = "block"));
  }
}
