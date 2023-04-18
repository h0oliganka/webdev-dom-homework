import { newDate } from "./script.js";
import { renderComments } from "./renderFunction.js";
import { initEventListeners } from "./script.js";
import { comments } from "./script.js";

const commentsElement = document.getElementById("comments");
let addForm = document.getElementById("add-form");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");

// GET
export const fetchAndRenderComments = () => {
  let commentsLoading = document.createElement('div');
  commentsLoading.id = 'commentsLoading';
  commentsLoading.innerHTML = '<p>Комментарии загружается...</p>';
  commentsElement.parentNode.replaceChild(commentsLoading, commentsElement);
  return fetch("https://webdev-hw-api.vercel.app/api/v1/alina-pitskhelauri/comments", {
    method: "GET",
  }).then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((responseData) => {
      let appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: '12.02.22 12:18',
          text: comment.text,
          likesCounter: 0,
        }

      })
      comments = appComments;
      renderComments();
      initEventListeners();
      console.log(comments);
    });

  }).then(() => {
    return commentsLoading.parentNode.replaceChild(commentsElement, commentsLoading);

  })
};

// создаем API(fetch - запускает запрос в api)
// GET
export const fetchPromise = () => {
  fetch('https://webdev-hw-api.vercel.app/api/v1/dasha-salova/comments', {
    method: "GET"
  })
    .then((response) => {

      const jsonPromise = response.json();

      jsonPromise.then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: newDate(),
            text: comment.text,
            likesCounter: 0,
            isLiked: comment.isLiked,
          };
        });
        comments = appComments;
        renderComments();
        initEventListeners();
        console.log(comments);
      });
    });
}



// POST
export const fetchPost = () => {
  return fetch('https://webdev-hw-api.vercel.app/api/v1/dasha-salova/comments', {
    method: "POST",
    body: JSON.stringify({
      name: nameInputElement.value,
      text: commentInputElement.value,
      date: newDate(),
      likesCounter: 0,
      forceError: true,
    }),
  }).then((response) => {
    if (response.status === 201) {
      nameInputElement.value = "";
      commentInputElement.value = "";
      return response.json();
    }
    if (response.status === 500) {
      throw new Error('Сервер сломался, попробуй позже');
    } if (response.status === 400) {
      alert("Имя и комментарий должны быть не короче 3 символов");

    }
  }).then(() => {
    return fetchPromise();

  }).then(() => {
    return addFormLoading.parentNode.replaceChild(addForm, addFormLoading);

  }).catch((error) => {
    addFormLoading.parentNode.replaceChild(addForm, addFormLoading);
    alert('Ошибка интернет соединения');
    console.warn(error);
  });
}
