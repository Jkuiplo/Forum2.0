// Получаем ник пользователя по его токену, (позже будем получать и аватарку)

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



/*####################################################*/


// Логика создания поста
document.getElementById("postButton").addEventListener('click', function() {
    // Получаем данные из формы
    const title = document.getElementById('NewPost_title').value;
    const content = document.getElementById('NewPost_content').value;
    
    // Проверяем, что все поля заполнены
    if (!title || !content) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    
    // Получаем токен из localStorage
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Пожалуйста, войдите в систему");
        return;
    }

    // Создаем объект данных для отправки
    const postData = {
        title: title,
        content: content
    };

    // Отправляем запрос на сервер для создания поста
    fetch('http://localhost:3000/api/threads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // добавляем токен для авторизации
        },
        body: JSON.stringify(postData) // сериализуем данные в JSON
    })
    .then(response => response.json()) // получаем ответ от сервера
    .then(data => {
        if (data.success) {
            alert("Пост успешно создан!");
            // Можно очистить форму или перенаправить пользователя
            document.getElementById('NewPost_title').value = '';
            document.getElementById('NewPost_content').value = '';
        } else {
            alert("Ошибка при создании поста");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Произошла ошибка. Попробуйте позже.");
    });
});


//#############################################


//отображение всех постов
document.addEventListener("DOMContentLoaded", () => {
    const threadsContainer = document.getElementById("threads-container");

    // Загружаем треды с сервера
    fetch("http://localhost:3000/api/threads")  
        .then(response => response.json())  
        .then(threads => {
            threads.forEach(thread => {
                // Создаем HTML-структуру для каждого треда
                const threadElement = document.createElement("div");
                threadElement.classList.add("thread");

                threadElement.innerHTML = `
                    <div class="thread-header">
                        <h3>${thread.title}</h3>
                        <span class="date">${new Date(thread.created_at).toLocaleString()}</span>
                    </div>
                    <p class="thread-content">${thread.content}</p>
                    
                    <div class="thread-footer">
                        <button class="like-btn">👍 <span>0</span></button>
                        <button class="dislike-btn">👎 <span>0</span></button>
                        <button class="comment-btn">💬 Комментировать</button>
                    </div>
                `;

                // Добавляем тред на страницу
                threadsContainer.appendChild(threadElement);
            });
        })
        .catch(error => console.error("Ошибка загрузки тредов:", error));
});
