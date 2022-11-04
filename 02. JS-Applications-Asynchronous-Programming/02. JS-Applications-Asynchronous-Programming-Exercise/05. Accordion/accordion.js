async function solution() {
  let response = await fetch(
    "http://localhost:3030/jsonstore/advanced/articles/list"
  );
  let data = await response.json();
  let main = document.getElementById("main");
  Object.values(data).forEach(async ({ _id, title }) => {
    let detailsResponse = await fetch(
      `http://localhost:3030/jsonstore/advanced/articles/details/${_id}`
    );
    let detailsData = await detailsResponse.json();
    let newAccordion = document.createElement("div");
    newAccordion.innerHTML = `
    <div class="accordion">
            <div class="head">
                <span>${title}</span>
                <button class="button" id="${_id}">More</button>
            </div>
            <div class="extra">
                <p>${detailsData.content}</p>
            </div>
    </div>
    `;
    main.appendChild(newAccordion);
    let currentBtn = document.getElementById(`${_id}`);
    currentBtn.addEventListener("click", expand);
  });
  function expand(event) {
    let btn = event.target;
    let accordion = btn.parentElement.parentElement;
    let extraContent = accordion.querySelector(".extra");

    if (btn.textContent == "More") {
      btn.textContent = "Less";
      extraContent.style.display = "block";
    } else {
      btn.textContent = "More";
      extraContent.style.display = "none";
    }
  }
}
