const buttonElement = document.getElementById("add-button");
  const listElement = document.getElementById("list");
  const nameInputElement = document.getElementById("name-input");
  const commentTextElement = document.getElementById("comment-text");

  buttonElement.addEventListener("click", () => {

    nameInputElement.classList.remove("error");
    commentTextElement.classList.remove("error")

    if (nameInputElement.value === "") {
      nameInputElement.classList.add("error");
      return;
    }

    if (commentTextElement.value === "") {
      commentTextElement.classList.add("error");
      return;
    }

    let myDate = new Date();
    const months = ["01", "02", "03", "04", "05", "06",
      "07", "08", "09", "10", "11", "12"];
    let year = String(myDate.getFullYear()).slice(2);
    let newDate = myDate.getDate() + "." + months[myDate.getMonth()] + "."
      + year + " " + myDate.getHours() + ":" + myDate.getMinutes()

    const oldListHtml = listElement.innerHTML;
    listElement.innerHTML = oldListHtml + ` <li class="comment"> 
          <div class="comment-header">
            <div>${nameInputElement.value}</div>
            <div>${newDate}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
             ${commentTextElement.value}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">0</span>
              <button class="like-button"></button>
            
            </div>
          </div>
        </li>`;
  })