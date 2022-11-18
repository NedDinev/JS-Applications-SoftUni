import { html, render } from "../node_modules/lit-html/lit-html.js";

const startRoot = document.getElementsByTagName("body")[0];
const startTemplate = html`
  <button id="loadBooks" @click=${loadAllBooks}>LOAD ALL BOOKS</button>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <form id="add-form" @submit=${addNewBook}>
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." />
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." />
    <input type="submit" value="Submit" />
  </form>

  <form id="edit-form" @submit=${saveBook} style="display:none">
    <input type="hidden" name="id" />
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." />
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." />
    <input type="submit" value="Save" />
  </form>
`;
render(startTemplate, startRoot);
async function loadAllBooks() {
  const url = "http://localhost:3030/jsonstore/collections/books";
  const response = await fetch(url);
  const data = await response.json();

  const root = document.getElementsByTagName("tbody")[0];
  const result = Object.values(data).map((x) => createTr(x));
  function createTr(dataArr) {
    return html`<tr>
      <td>${dataArr.title}</td>
      <td>${dataArr.author}</td>
      <td>
        <button @click=${editBook}>Edit</button>
        <button @click=${deleteBook}>Delete</button>
      </td>
    </tr>`;
  }
  render(result, root);
}
async function addNewBook(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  let body = {};
  for (const [key, value] of form) {
    if (value == "") return;
    body[key] = value;
  }
  const url = "http://localhost:3030/jsonstore/collections/books";
  bookRequest("POST", body, url);
  event.target.reset();
  loadAllBooks();
}
async function editBook(event) {
  const title =
    event.target.parentElement.parentElement.querySelectorAll("td")[0]
      .textContent;
  const author =
    event.target.parentElement.parentElement.querySelectorAll("td")[1]
      .textContent;
  const id = await getBookId(event);
  document.getElementById("add-form").style.display = "none";
  document.getElementById("edit-form").style.display = "block";
  const idInput = document.querySelectorAll("#edit-form input")[0];
  const titleInput = document.querySelectorAll("#edit-form input")[1];
  const authorInput = document.querySelectorAll("#edit-form input")[2];
  idInput.value = id;
  titleInput.value = title;
  authorInput.value = author;
  loadAllBooks();
}
async function saveBook(event) {
  event.preventDefault();

  const form = new FormData(event.target);

  let id = "";
  let body = {};
  for (const [key, value] of form) {
    if (key == "id") {
      id = value;
      continue;
    }
    if (value == "") return;
    body[key] = value;
  }
  const url = `http://localhost:3030/jsonstore/collections/books/${id}`;
  bookRequest("PUT", body, url);

  event.target.reset();
  document.getElementById("add-form").style.display = "block";
  document.getElementById("edit-form").style.display = "none";
  loadAllBooks();
}
async function deleteBook(event) {
  const id = await getBookId(event);
  const url = `http://localhost:3030/jsonstore/collections/books/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  event.target.parentElement.parentElement.remove();
  document.getElementById("add-form").style.display = "block";
  document.getElementById("edit-form").style.display = "none";
  loadAllBooks();
}
async function getBookId(currEvent) {
  const title =
    currEvent.target.parentElement.parentElement.querySelector(
      "td"
    ).textContent;
  const url = `http://localhost:3030/jsonstore/collections/books`;
  const response = await fetch(url);
  const data = await response.json();
  let foundId = "";
  for (let [key, value] of Object.entries(data)) {
    if (data[key].title == title) {
      foundId = key;
    }
  }
  if (foundId != "") return foundId;
}
async function bookRequest(method, body, url) {
  const headers = {
    method: `${method}`,
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return await fetch(url, headers);
}
