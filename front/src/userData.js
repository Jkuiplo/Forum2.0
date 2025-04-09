// Логика получения данных о пользователе
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const profileContainer = document.querySelector(".profile-on-header");

    if (token) {
        // Делаем запрос к API для получения данных о пользователе
        fetch("http://localhost:3000/api/auth/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                // Удаляем кнопки "Войти" и "Зарегистрироваться"
                profileContainer.innerHTML = `
                    <span class="profile-on-header">
                        <h2 class="username" id="names">${data.username}</h2>
                        <img src="${data.avatar || '/img/profile.svg'}" alt="Аватар" class="avatar" class="PROFimg">
                    </span>
                `;
            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
        });
    }
});



document.addEventListener('DOMContentLoaded', () => {
    function getCookie(name) {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    const accessToken = getCookie('accessToken');
    const menu = document.getElementById('menu');
    const nameBlock = document.getElementById('names');

    const themeToggle = document.querySelector('.theme-toggle');
    const menuExit = document.querySelector('.menu-exit');

    const profileBtn = menu?.querySelectorAll('.menu-button')[0];
    const notifBtn = menu?.querySelectorAll('.menu-button')[1];

    if (!accessToken) {
        // Удаляем имя
        nameBlock?.remove();

        // Удаляем элементы
        themeToggle?.remove();
        menuExit?.remove();

        // Меняем текст и навешиваем редиректы
        if (profileBtn) {
            profileBtn.querySelector('span').textContent = 'sign up';
            profileBtn.addEventListener('click', () => {
                window.location.href = '/authorization';
            });
        }

        if (notifBtn) {
            notifBtn.querySelector('span').textContent = 'login';
            notifBtn.addEventListener('click', () => {
                window.location.href = '/login';
            });
        }
    }
});
