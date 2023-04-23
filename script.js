import { renderComments } from "./renderFunction.js";
import { getCommentsLoading, getComments, postComments } from "./api.js";

const buttonElement = document.getElementById("add-button");
const commentsElement = document.getElementById("comments");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
let addForm = document.getElementById("add-form");

// GET
export const fetchAndRenderComment = () => {
  let commentsLoading = document.createElement('div');
  commentsLoading.id = 'commentsLoading';
  commentsLoading.innerHTML = '<p>Комментарии загружается...</p>';
  commentsElement.parentNode.replaceChild(commentsLoading, commentsElement);
  return getCommentsLoading();
}

// 2 get
export const fetchAndRenderCommentsTwo = () => {
  return getComments();
}

fetchAndRenderComment();
fetchAndRenderCommentsTwo();

// кнопка лайка и счетчик
export const initEventListeners = () => {
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
export let comments = [{
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

// дата и время комментария
export function newDate() {
  let date = new Date();
  let monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  let myMinute = String(date.getMinutes()).length < 2 ? '0' + date.getMinutes() : date.getMinutes();
  let myHours = String(date.getHours()).length < 2 ? '0' + date.getHours() : date.getHours();
  let myDay = String(date.getDate()).length < 2 ? '0' + date.getDate() : date.getDate();
  let myMonth = monthArray[+date.getMonth()];
  let myYear = String(date.getFullYear()).slice(2);
  let str = myDay + '.' + myMonth + '.' + myYear + '.' + myHours + '.' + myMinute;
  return str;
}


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

  // рендер нового коммента
  comments.push({
    name: nameInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    date: newDate(),
    text: commentInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    likesCounter: 0,
  });
  // let addFormLoading = document.createElement('div');
  // addFormLoading.id = 'addFormLoading';
  // addFormLoading.innerHTML = '<p>Комментарий загружается...</p>';
  addForm.parentNode.appendChild(addFormLoading, addForm);

  // POST
  const postAndRenderComments = () => {
    // let addFormLoading = document.createElement('div');
    // addFormLoading.id = 'addFormLoading';
    // addFormLoading.innerHTML = '<p>Комментарий загружается...</p>';
    addForm.parentNode.appendChild(addFormLoading, addForm);

    return postComments({ nameInputElement, commentInputElement })
      .then(() => {
        return addFormLoading.parentNode.appendChild(addForm, addFormLoading);
      })
      .then(() => {
        return fetchAndRenderCommentsTwo();

      }).then(() => {
        return addFormLoading.parentNode.appendChild(addForm, addFormLoading);

      }).catch((error) => {
        addFormLoading.parentNode.appendChild(addForm, addFormLoading);
        alert('Ошибка интернет соединения');
        console.warn(error);
      });
  }
  postAndRenderComments();
  renderComments();
  initEventListeners();
});
renderComments();
initEventListeners();