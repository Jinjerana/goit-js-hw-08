// HTML містить розмітку форми. Напиши скрипт, який буде зберігати значення полів 
// у локальне сховище, коли користувач щось друкує.

// <form class="feedback-form" autocomplete="off">
//   <label>
//     Email
//     <input type="email" name="email" autofocus />
//   </label>
//   <label>
//     Message
//     <textarea name="message" rows="8"></textarea>
//   </label>
//   <button type="submit">Submit</button>
// </form>

// Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js. 
// Розбий його на декілька підзавдань:

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище 
// об'єкт з полями email і message, у яких зберігай поточні значення полів форми. 
// Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, 
// заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль 
// об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. 
// Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

import throttle from 'lodash.throttle';

const form = document.querySelector(".feedback-form");
const LOCALSTORAGE_KEY = "feedback-form-state";
reloadForm();

form.addEventListener("input", throttle(inputData, 500));
form.addEventListener("submit", handleSubmit);

function handleSubmit(evt) {
    evt.preventDefault();
    const { email, message
    } = evt.currentTarget.elements;
    console.log({ email: email.value, message: message.value })
    if (localStorage.getItem(LOCALSTORAGE_KEY)) {
        localStorage.removeItem(LOCALSTORAGE_KEY)
    }
    evt.currentTarget.reset();
}

function inputData(evt) {
    let data = localStorage.getItem(LOCALSTORAGE_KEY);
    data = data ? JSON.parse(data) : {};
    data[evt.target.name] = evt.target.value.trim();
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}

function reloadForm() {
    let data = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!data) return;
    data = JSON.parse(data);
    for (const key in data) {
        form.elements[key].value = data[key] || '';
    }
}

