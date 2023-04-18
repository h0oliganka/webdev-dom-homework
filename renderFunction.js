import { comments } from "./script.js";
import { initEventListeners } from "./script.js";

const commentsElement = document.getElementById("comments");

// рендер функция
export const renderComments = () => {
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