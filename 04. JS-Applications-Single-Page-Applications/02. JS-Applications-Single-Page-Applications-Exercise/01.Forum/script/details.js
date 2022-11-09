const section = document.getElementById("detailsView");
const main = document.getElementsByTagName("main")[0];
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);
const themeContentWrapper = document.getElementById("theme-content-wrapper");
const comment = document.querySelector(".comment");
section.remove();

export async function showDetails(e) {
  if (!e) {
    return;
  }
  let id;
  if (e.target.tagName == "H2") {
    id = e.target.parentElement.id;
  } else if (e.target.tagName == "A") {
    id = e.target.id;
  }

  const topic = await loadTopic(id);
  const comments = await loadComment(id);

  const res = topicTemplate(topic, comments); //tbd
  themeContentWrapper.replaceChildren(res);
  main.replaceChildren(section);
}

function topicTemplate(topic, comments) {
  const topicContainer = document.createElement("div");
  topicContainer.classList.add("theme-title");
  topicContainer.innerHTML = `           
  <div class="theme-name-wrapper">
      <div class="theme-name">
          <h2>${topic.topicName}</h2>
      </div>
  </div>
`;
  //<div class="comment">
  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment");
  commentContainer.innerHTML = `<div class="header">
  <img src="./static/profile.png" alt="avatar">
  <p><span>${topic.username}</span> posted on <time>${topic.date}</time></p>

  <p class="post-content">${topic.postText}</p>
</div>`;

  comments.forEach((x) => {
    const comment = createComment(x);
    commentContainer.appendChild(comment);
  });

  return commentContainer;
}
function createComment(data) {
  const container = document.createElement(div);
  container.classList.add("user-comment");
  container.innerHTML = `<div class="topic-name-wrapper">
  <div class="topic-name">
  <p><strong>${data.username}</strong> commented on <time>${data.date}</time></p>
  <div class="post-content">
      <p>${data.postText}</p>
  </div>
</div>
</div>`;
  return container;
}
function onSubmit(e) {
  e.preventDefault();
  const fromData = new FormData(form);
  const { postText, username } = Object.fromEntries(fromData);
  createPost({ postText, username, id, date: new Date() });
}
async function createPost(body) {
  const url = `http://localhost:3030/jsonstore/collections/myboard/posts`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  const commentEl = createComment(data);
  comment.appendChild(commentEl);
  clearForm();
}
function clearForm() {
  return form.reset();
}

async function loadComment(id) {
  const url = "http://localhost:3030/jsonstore/collections/myboard/posts"; //todo id??

  const response = await fetch(url);
  const data = await response.json();
  const filterData = Object.values(data).filter((x) => x.id === id);
  return filterData;
}

async function loadTopic(id) {
  const url = `http://localhost:3030/jsonstore/collections/myboard/posts/${id}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
}
