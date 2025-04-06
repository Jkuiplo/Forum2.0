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