async function attachEvents() {
 const authorName = document.querySelector(`input[name="author"]`);
 const msgText = document.querySelector(`input[name="content"]`);
 const messages = document.getElementById("messages");
 const submit = document.getElementById("submit");
 const refresh = document.getElementById("refresh");

  submit.addEventListener("click", sendMsg);
  refresh.addEventListener("click", showAllMsg);

  async function sendMsg() {
    if (authorName.value == "" || msgText.value == "") {
      return;
    }
   const msg = {
      author: authorName.value,
      content: msgText.value,
    };
    fetch("http://localhost:3030/jsonstore/messenger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msg),
    });
    authorName.value = "";
    msgText.value = "";
  }
  async function showAllMsg() {
   const respond = await fetch("http://localhost:3030/jsonstore/messenger");
   const data = await respond.json();
    messages.textContent = "";
   const allMsg = [];
    Object.values(data).forEach((messageObj) => {
      allMsg.push(`${messageObj.author}: ${messageObj.content}`);
    });
    messages.textContent = allMsg.join(`\n`);
  }
}

attachEvents();
