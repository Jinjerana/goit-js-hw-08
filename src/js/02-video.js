// HTML містить <iframe> з відео для Vimeo плеєра. 
// Напиши скрипт, який буде зберігати поточний час відтворення відео у локальне сховище і, 
// після перезавантаження сторінки, продовжувати відтворювати відео з цього часу.

// <iframe
//   id="vimeo-player"
//   src="https://player.vimeo.com/video/236203659"
//   width="640"
//   height="360"
//   frameborder="0"
//   allowfullscreen
//   allow="autoplay; encrypted-media"
// ></iframe>

// Виконуй це завдання у файлах 02-video.html і 02-video.js. Розбий його на декілька підзавдань:

// Ознайомся з документацією бібліотеки Vimeo плеєра.
// Додай бібліотеку як залежність проекту через npm.
// Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player, 
// але враховуй, що у тебе плеєр доданий як npm пакет, а не через CDN.
// Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу 
// відтворення.
// Зберігай час відтворення у локальне сховище. Нехай ключем для сховища 
// буде рядок "videoplayer-current-time".
// Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою 
// відновлення відтворення зі збереженої позиції.
// Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення 
// оновлювався у сховищі не частіше, ніж раз на секунду.

import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const onPlay = function({seconds}) {
    localStorage.setItem("videoplayer-current-time", JSON.stringify(seconds))      
    };

player.on('timeupdate', throttle(onPlay, 1000));

const LS = localStorage.getItem("videoplayer-current-time")

// timeupdate
// Triggered as the currentTime of the video updates. It generally fires every 250ms, 
// but it may vary depending on the browser.

player.setCurrentTime(LS).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});

// throttle(func, [wait=1000], [options={}])

console.log(Player)