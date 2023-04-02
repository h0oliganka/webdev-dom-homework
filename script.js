const buttonElement = document.getElementById("add-button");
const commentsElement = document.getElementById("comments");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const likes = document.querySelectorAll('.likes');

// кнопка лайка и счетчик
const initEventListeners = () => {
  const likeElements = document.querySelectorAll('.like-button');
  for (const likeElement of likeElements) {
    likeElement.addEventListener('click', (event) => {
      likeElement.classList.toggle('-active-like');
      const index = [...document.querySelectorAll('.like-button')].indexOf(likeElement);
      const count = document.querySelectorAll('.likes-counter')[index];
      likeElement.classList.contains('-active-like') ? count.innerHTML++ : count.innerHTML--;
      event.stopPropagation();
    })
  }

  // ответ на комментарий
  const commentElementsAnswer = document.querySelectorAll('.comment');
  for (const commentAnswer of commentElementsAnswer) {
    commentAnswer.addEventListener('click', () => {
      const text = commentAnswer.dataset.text;
      const nameComment = commentAnswer.dataset.name;
      commentInputElement.value = ">" + text + "\n" + nameComment;
      renderComments();
      initEventListeners();
    });
  }
}

// массив объектов
let comments = [{
  name: 'Глеб Фокин',
  date: '12.02.22 12:18',
  text: 'Это будет первый комментарий на этой странице',
  likesCounter: 3,
},
{
  name: 'Варвара Н.',
  date: '13.02.22 19:22',
  text: 'Мне нравится как оформлена эта страница! ❤',
  likesCounter: 75,
}];

// рендер функция
const renderComments = () => {
  const commentsHtml = comments.map((comment) => {
    return `<li class="comment" data-text="${comment.text}" data-name="${comment.name}">
      <div class="comment-header">
        <div >${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div  class="comment-text" >
         ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span  class="likes-counter">${comment.likesCounter}</span>
          <button class="like-button" ></button>
        </div>
      </div>
    </li>`;
  }).join('');
  initEventListeners();
  commentsElement.innerHTML = commentsHtml;
}

// дата и время комментария
let myDate = new Date();
const months = ["01", "02", "03", "04", "05", "06",
  "07", "08", "09", "10", "11", "12"];
let year = String(myDate.getFullYear()).slice(2);
let day = myDate.getDate();
if (day < 10) {
  day = '0' + day;
}
let hour = myDate.getHours();
if (hour < 10) {
  hour = '0' + hour;
}
let minute = myDate.getMinutes();
if (minute < 10) {
  minute = '0' + minute;
}
let newDate = day + "." + months[myDate.getMonth()] + "."
  + year + " " + hour + ":" + minute;


// проверка ввода
buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove('error');

  if (nameInputElement.value === '') {
    nameInputElement.classList.add('error');
    return;
  }

  commentInputElement.classList.remove('error');

  if (commentInputElement.value === '') {
    commentInputElement.classList.add('error');
    return;
  }

  fetch('https://webdev-hw-api.vercel.app/api/v1/dasha-salova/comments', {
    method: "POST",
    body: JSON.stringify({
      text: nameInputElement.value,
    }),
  }).then((response) => {
    response.json().then((responseData) => {
      commentResponsePost = responseData.comments;
      renderComments();
    });
  });

  renderComments();

  // рендер нового коммента
  comments.push({
    name: nameInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    date: newDate,
    text: commentInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    likesCounter: 0,
  });
  renderComments();
  initEventListeners();
});
renderComments();
initEventListeners();

// создаем API(fetch - запускает запрос в api)
const fetchPromise = fetch('https://webdev-hw-api.vercel.app/api/v1/dasha-salova/comments', {
  method: "GET"
});

console.log(fetchPromise);

fetchPromise.then((response) => {
  console.log(response);

  const jsonPromise = response.json();

  jsonPromise.then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date),
        text: comment.text,
        likesCounter: comment.likesCounter,
      };
    });
    comments = appComments;
    renderComments();
  });
});



