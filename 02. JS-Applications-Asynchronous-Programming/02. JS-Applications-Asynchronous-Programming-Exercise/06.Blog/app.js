function attachEvents() {
  const btnLoadPosts = document.getElementById("btnLoadPosts");
  const posts = document.getElementById("posts");
  const btnViewPost = document.getElementById("btnViewPost");

  btnLoadPosts.addEventListener("click", loadPosts);
  btnViewPost.addEventListener("click", viewPosts);

  async function loadPosts() {
    posts.innerHTML = "";
    const postsResponse = await fetch(
      `http://localhost:3030/jsonstore/blog/posts`
    );
    const postsData = await postsResponse.json();
    Object.entries(postsData).forEach(([id, obj]) => {
      const newOption = document.createElement("option");
      newOption.value = obj.id;
      newOption.textContent = obj.title;
      posts.appendChild(newOption);
    });
  }
  async function viewPosts() {
    const postResponse = await fetch(
      `http://localhost:3030/jsonstore/blog/posts/${posts.value}`
    );
    const postData = await postResponse.json();
    const postTitle = document.getElementById("post-title");

    if (posts.value != "") {
      postTitle.textContent = postData.title;
    }

    const postBody = document.getElementById("post-body");
    postBody.textContent = postData.body;

    const commentsResponse = await fetch(
      `http://localhost:3030/jsonstore/blog/comments`
    );
    const commentsData = await commentsResponse.json();
    const postComments = document.getElementById("post-comments");
    postComments.innerHTML = "";

    for (const [key, value] of Object.entries(commentsData)) {
      if (value.postId == posts.value) {
        const newLi = document.createElement("li");
        newLi.id = value.id;
        newLi.textContent = value.text;
        postComments.appendChild(newLi);
      }
    }
  }
}

attachEvents();
