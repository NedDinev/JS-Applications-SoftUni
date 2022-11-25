import { clearUserData, getUserData } from "./utility.js";

const domain = "http://localhost:3030";

async function request(url, method, data) {
  const options = {
    method,
    headers: {},
  };

  if (data != undefined) {
    options.headers["Content-type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const user = getUserData();

  if (user) {
    options.headers["X-Authorization"] = user.accessToken;
  }

  try {
    const response = await fetch(domain + url, options);

    if (!response.ok) {
      if (response.status == 403) {
        clearUserData();
      }
      const error = await response.json();
      throw new Error(error.message);
    }

    if (response.status == 204) {
      return response;
    } else {
      return response.json();
    }
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

export async function get(url) {
  return request(url, "GET");
}

export async function post(url, data) {
  return request(url, "POST", data);
}

export async function put(url, data) {
  return request(url, "PUT", data);
}

export async function del(url) {
  return request(url, "DELETE");
}
