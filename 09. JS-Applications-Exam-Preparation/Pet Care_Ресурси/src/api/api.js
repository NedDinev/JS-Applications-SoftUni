import { getUserData } from "../util.js";

const host = "http://localhost:3030"; //server name

async function request(method, url, data) {
  //runs all requests
  const options = {
    method,
    headers: {},
  };

  if (data !== undefined) {
    // if request has data adds body to headers
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const user = getUserData();

  if (user) {
    // if request has user add authorization token to headers
    options.headers["X-Authorization"] = user.accessToken;
  }

  try {
    const response = await fetch(host + url, options);

    if (response.status == 204) {
      // means that response request is OK but it's empty
      return response;
    }
    const result = await response.json();

    if (response.ok == false) {
      // if response request is not ok this will throw an error message to the catch
      throw new Error(result.message);
    }
    // if everything is ok return request response
    return result;
  } catch (err) {
    alert(err.message);
    throw err; // throws error to the request
  }
}

//decorate request with methods that the server support
export const get = (url) => request("get", url);
export const post = (url) => request("post", url);
export const put = (url) => request("put", url);
export const del = (url) => request("delete", url);
