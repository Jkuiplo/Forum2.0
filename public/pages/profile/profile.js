
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
}
const token = getCookie('token');

async function getUserData() {
    if (token) {
        fetch("http://localhost:5000/api/auth/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.username) {
                    const userName = document.getElementById('profile-name');
                    userName.innerHTML = data.username;

                    const avatar = document.getElementById('profile-image');
                    avatar.src = data.avatar || "/public/img/profile.svg";
                    console.log(data);
                }
            })
            .catch(error => {
                console.error("Ошибка:", error);
            });
    }
    else {
        console.log("Не авторизован");
    }
}
getUserData().then(data => {

});


// 

import { getFollowersCount, toggleFollow } from "../../api/user.js";

const followBtn = document.getElementById("profile-subs");
const followersCounter = document.getElementById("followers-followers");

const viewedUserId = new URLSearchParams(window.location.search).get("id");

async function loadFollowers() {
    const { followers } = await getFollowersCount(viewedUserId);
    followersCounter.textContent = `Подписчиков: ${followers}`;
}

followBtn.addEventListener("click", async () => {
    const result = await toggleFollow(viewedUserId, token);
    followBtn.textContent = result.followed ? "Отписаться" : "Подписаться";
    await loadFollowers(); // обновим счётчик
});

loadFollowers();





const profileImage = document.getElementById('profile-image');
const fileInput = document.getElementById('avatar-input');

profileImage.addEventListener('click', () => {
    fileInput.click(); // Открыть окно выбора файла
});

fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    const res = await fetch('/api/avatar', {
        method: 'POST', 
        headers: {
            // токен, если требуется
            Authorization: 'Bearer ' + token
        },
        body: formData
    });

    const data = await res.json();
    if (res.ok) {
        profileImage.src = '/' + data.avatar; // показать новый аватар
        alert('Аватар обновлён!');
    } else {
        alert('Ошибка: ' + data.message);
    }
});

