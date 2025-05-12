const profile = document.getElementById("profile");
profile.addEventListener("click", () => {
  window.location.href = "/profile";
}
);

const exit = document.getElementById("exit");
exit.addEventListener("click", () => {
  window.location.href = "/logout";
}
);
// --------------------Функция для получения куки--------------------

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
}


function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // скрыть через 3 секунды
}

// --------------------Логин и авторизация--------------------
const googleBtn = document.querySelectorAll(".googleBtn");
const loginBtn = document.getElementById("loginBtn");
const regBtn = document.getElementById("regBtn");

googleBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("google нажал");
    window.location.href = "/auth/google";
  });
});

loginBtn.addEventListener("click", () => {
  console.log("логин нажал");
});

regBtn.addEventListener("click", () => {
  console.log("рег нажал");
});

// ----------------------- login -----------------------
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Предотвращаем стандартное поведение формы

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showToast("Заполните оба поля!")
    return;
  }

  console.log('Email:', email);
  console.log('Password:', password);

  // Отправка данных на сервер
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      document.cookie = `token=${data.token}; path=/; max-age=2592000; samesite=strict`;
      window.location.href = "/";
    } else {
      const error = await response.json();
      console.error('Login failed:', error.message);
      showToast("Неверный логин или пароль");
    }
  } catch (err) {
    console.error('Network error:', err);
    showToast("Ошибка сети");
  }
});


// ----------------------- register -----------------------
const registerForm = document.getElementById('registerOverlay');
const email = document.getElementById('registerEmail');
const username = document.getElementById('registerUsername');
const password = document.getElementById('registerPassword');

async function registerUser(username, email, password) {
  const responce = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });
  return responce.json();
}

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Предотвращаем стандартное поведение формы

  const emailValue = email.value.trim();
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (!emailValue || !usernameValue || !passwordValue) {
    alert('Please fill in all fields.');
    return;
  }
  else {
    console.log('Email:', emailValue);
    console.log('Username:', usernameValue);
    console.log('Password:', passwordValue);

    const result = await registerUser(usernameValue, emailValue, passwordValue);


    if (result.message == "Ошибка: SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email") {
      console.log(result.message);
      showToast("Эта почта уже используется");
    }
    if (result.message == "Ошибка: SQLITE_CONSTRAINT: UNIQUE constraint failed: users.username") {
      console.log(result.message);
      showToast("Этот ник уже используется");
    }
    if (result.message == "Пользователь зарегестрирован") {
      showToast("Пользователь зарегестрирован");
      closeRegisterModal();
      openModal();
    }
  }

});

// --------------------Если токен есть, отображаем ник, создание поста ! Надо добавить отображение аватаров ! --------------------







// // -----------------------В этом файле вся логика главной страницы: все отображение на главной странице-----------------------
// // -----------------------Переход по нажатию на кнопки--------------------

// const loginBtn = menu?.querySelectorAll('.menu-button')[0];
// const regBtn = menu?.querySelectorAll('.menu-button')[1];

// loginBtn.addEventListener('click', () => {
//   window.location.href = '/login';
// });
// regBtn.addEventListener('click', () => {
//   window.location.href = '/authorization';
// });

// // --------------------Если токен есть, отображаем ник, создание поста ! Надо добавить отображение аватаров ! --------------------

// const token = getCookie('token');
// const profileContainer = document.querySelector(".profile-on-header");

// if (token) {
//   fetch("http://localhost:5000/api/auth/me", {
//     method: "GET",
//     headers: {
//       "Authorization": "Bearer " + token
//     }
//   })
//     .then(response => response.json())
//     .then(data => {
//       if (data.username) {
//         console.log(data.username)
//         profileContainer.innerHTML = `
// <button class="popup-btn">
//     <img class="addPOST" src="img/addpost.svg">

// </button>

// <h2 id="names">
//     ${data.username}
// </h2> <!-- для имени -->
// <div class="menu-wrapper">

// <button style="all: unset;" id="profile-button">
//     <img class="PROFimg" src="img/profile.svg" id="progIMG">
// </button>
//     <div class="menu hidden-menu" id="menu">
//         <div class="menu-button" id=profileBtn>
//         <img src="img/profile-ico.svg">
//         <span>my profile</span>
//         </div>

//         <div class="menu-button">
//         <img src="img/notifacion-ico.svg">
//         <span>notification</span>
//         </div>

//         <span class="menu-bottom bottom-switch">
//         <div class="theme-toggle">
//             <img src="img/sun-ico.svg">
//             <div class="switch" id="themeSwitch">
//             <div class="switch-circle"></div>
//             </div>
//             <img src="img/moon-ico.svg">
//         </div>


//         <div class="menu-exit">
//             <img src="img/door-ico.svg">
//             <span>exit</span>
//         </div>
//         </span>


//     </div>
// </div>
//               `;


//         //----------------------!!Так делать не стоит, это логика кнопок, которые были добавлены вон там ^ ---------------------------!!
// const profileBtn = document.getElementById('profileBtn');
// const popupBtn = document.querySelector('.popup-btn');
// const popup = document.getElementById('popup');
// const overlay = document.getElementById('overlay');
// const closeBtn = document.getElementById('closePopup');
// const exitBtn = document.querySelector('.menu-exit');

// profileBtn.addEventListener('click', () => {
//   window.location.href = '/public/pages/profile/profile.html';
// });
// popupBtn.addEventListener('click', () => {
//   popup.classList.add('active');
//   overlay.classList.add('active');
// });

// closeBtn.addEventListener('click', () => {
//   popup.classList.remove('active');
//   overlay.classList.remove('active');
// });

// overlay.addEventListener('click', () => {
//   popup.classList.remove('active');
//   overlay.classList.remove('active');
// });


// const toggleMenuBtn = document.getElementById('profile-button');
// const menu = document.getElementById('menu');
// const themeSwitch = document.getElementById('themeSwitch');
// toggleMenuBtn.addEventListener('click', () => {
//   menu.classList.toggle('hidden-menu');
// });

// document.addEventListener('click', (e) => {
//   if (!e.target.closest('.menu-wrapper')) {
//     menu.classList.add('hidden-menu');
//   }
// });

// themeSwitch.addEventListener('click', () => {
//   themeSwitch.classList.toggle('on');
//   document.body.classList.toggle('dark');
// });

// exitBtn.addEventListener('click', () => {
//   window.location.href = '/logout';
// });
//       }
//     })
//     .catch(error => {
//       console.error("Ошибка:", error);
//     });
// }
// else {
//   console.log("Не авторизован");
// }

// --------------------Отображение постов--------------------
// --------------------Умный чатгпт придумал функцию для показа времени и склонения времени --------------------
function timeAgo(timestamp) {
  const now = Date.now();
  const seconds = Math.floor(((now - timestamp) / 1000) - 18000);

  const intervals = [
    { label: 'год', seconds: 31536000 },
    { label: 'месяц', seconds: 2592000 },
    { label: 'день', seconds: 86400 },
    { label: 'час', seconds: 3600 },
    { label: 'минута', seconds: 60 },
    { label: 'секунда', seconds: 1 },
  ];

  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) {
      return `${count} ${decline(i.label, count)} назад`;
    }
  }

  return 'только что';
}

function decline(word, count) {
  const forms = {
    'секунда': ['секунда', 'секунды', 'секунд'],
    'минута': ['минуту', 'минуты', 'минут'],
    'час': ['час', 'часа', 'часов'],
    'день': ['день', 'дня', 'дней'],
    'месяц': ['месяц', 'месяца', 'месяцев'],
    'год': ['год', 'года', 'лет']
  };

  const mod10 = count % 10;
  const mod100 = count % 100;
  const form = (mod10 === 1 && mod100 !== 11) ? 0 :
    (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) ? 1 : 2;

  return forms[word][form];
}

// // --------------------Получение лайков, дизлайков, количества комментов--------------------

// --------------------Отображение/получение постов--------------------

const postsContainer = document.getElementById('posts-container');
async function loadThreads() {
  try {
    const response = await fetch('/api/threads', {
      method: 'GET',
      credentials: 'same-origin'
    });

    if (response.ok) {
      const threads = await response.json();
      console.log('Треды:', threads);

      postsContainer.innerHTML = ``;

      threads.forEach(thread => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const isoDate = thread.created_at.replace(' ', 'T');
        const timestamp = new Date(isoDate).getTime();
        const readableTime = timeAgo(timestamp);

        postElement.innerHTML = `
          <span class="toppost">
            <div class="profile_on_post" id="profile_on_postID">
            </div>
            <span class="main_text_post">
              <span class="title_post">
                <h2>${thread.title}</h2>
              </span>
              <span class="text_post_main">
                ${thread.content}
              </span>
            </span>
          </span>
          <span class="middlepost">
            <span class="post_content">
              ${thread.image ? `<img src="${thread.image}" id="CONT_POST" class="postImage">` : ''}
            </span>
          </span>
          <span class="bottompost">
            <span class="likes" data-thread-id="${thread.id}">
              <img src="/img/thumb_up.svg" class="like-button">
              <a id="like_num">${thread.vote}</a>
              <img src="/img/thumb_down.svg">
              <img src="/img/comment.svg">
              <a id="comment_num">${thread.comment_count}</a>
            </span>
            <span id="date">${readableTime}</span>
          </span>
        `;

        postsContainer.appendChild(postElement);
      });
    } else {
      const error = await response.json();
      console.error('Ошибка при загрузке тредов:', error.message || 'Неизвестная ошибка');
    }
  } catch (error) {
    console.error('Ошибка сети при загрузке тредов:', error);
  }
}
loadThreads();



const like = document.querySelectorAll('.likes');
like.forEach((like) => {
  like.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log('aaa');
  });
});

// --------------------Создание постов--------------------

const uploadPostButton = document.getElementById('upload_post');
const postTitleInput = document.getElementById('post_title');
const postContentTextarea = document.getElementById('post_content');
const uploadFileInput = document.getElementById('upload_file_post');

uploadPostButton.addEventListener('click', async () => {
  const title = postTitleInput.value.trim();
  const content = postContentTextarea.value.trim();
  const imageFile = uploadFileInput.files[0];

  if (!title || !content) {
    alert('Пожалуйста, введите заголовок и текст поста.');
    return;
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  if (imageFile) {
    formData.append('image', imageFile);
  }

  try {
    const response = await fetch('/api/threads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token2}`
        // Важно: браузер сам установит Content-Type как multipart/form-data из объекта FormData
      },
      body: formData,
      credentials: 'same-origin' // Это отправит куки вместе с запросом
    });

    if (response.ok) {
      const data = await response.json();
      alert('Пост успешно создан!'); // ! убрать !
      console.log('Ответ сервера:', data);
      postTitleInput.value = '';
      postContentTextarea.value = '';
      uploadFileInput.value = '';

    } else {
      const error = await response.json();
      alert(`Ошибка при создании поста: ${error.message || 'Неизвестная ошибка'}`);
      console.error('Ошибка сервера:', error);
    }
  } catch (error) {
    alert('Произошла ошибка при отправке запроса.');
    console.error('Ошибка отправки:', error);
  }
});
