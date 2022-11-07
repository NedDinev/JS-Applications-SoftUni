function pageFuncs() {
  const url = `http://localhost:3030/jsonstore/collections/books`;
  const loadBooksBtn = document.getElementById("loadBooks");
  const tableBody = document.getElementsByTagName("tbody")[0];
  const submitBtn = document.querySelector("#form button");
  const editForm = document.getElementById("editForm");

  loadBooksBtn.addEventListener("click", loadBooks);
  submitBtn.addEventListener("click", submitBook);

  async function loadBooks() {
    const response = await fetch(url);
    const data = await response.json();
    tableBody.innerHTML = "";

    Object.entries(data).forEach((entry) => {
      const [id, book] = entry;

      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${book.title}</td>
      <td>${book.author}</td>
      `;
      const buttonsTd = document.createElement("td");
      const buttonEdit = document.createElement("button");
      buttonEdit.textContent = "Edit";
      const buttonDelete = document.createElement("button");
      buttonDelete.textContent = "Delete";

      buttonsTd.appendChild(buttonEdit);
      buttonsTd.appendChild(buttonDelete);
      tr.appendChild(buttonsTd);
      tableBody.appendChild(tr);
      buttonDelete.addEventListener("click", async function deleteBook(event) {
        const deleteRequest = await fetch(
          `http://localhost:3030/jsonstore/collections/books/${id}`,
          {
            method: "DELETE",
          }
        );
        event.target.parentElement.parentElement;
        loadBooks();
      });
      buttonEdit.addEventListener("click", async function editBook(event) {
        document.getElementById("form").style.display = "none";
        editForm.style.display = "block";
        const currentTitle =
          event.target.parentElement.parentElement.children[0];
        const currentAuthor =
          event.target.parentElement.parentElement.children[1];

        document.getElementById("editTitle").value = currentTitle.textContent;
        document.getElementById("editAuthor").value = currentAuthor.textContent;

        const saveBtn = document.querySelector("#editForm button");
        saveBtn.addEventListener("click", async function save(event) {
          event.preventDefault();
          const editFormElements = document.getElementById("editForm").elements;

          const body = {
            author: editFormElements.author.value,
            title: editFormElements.title.value,
          };

          const headers = getHeaders("PUT", body);
          const postBook = await fetch(
            `http://localhost:3030/jsonstore/collections/books/${id}`,
            headers
          );
          document.getElementById("form").style.display = "block";
          editForm.style.display = "none";
          loadBooks();
        });
      });
    });
  }
  async function submitBook(event) {
    event.preventDefault();
    const formElements = document.getElementById("form").elements;

    const body = {
      author: formElements.author.value,
      title: formElements.title.value,
    };

    const headers = getHeaders("POST", body);
    const postBook = await fetch(url, headers);
    loadBooks();
  }

  function getHeaders(method, body) {
    return {
      method: `${method}`,
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }
}
pageFuncs();
