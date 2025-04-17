function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;  
}
document.addEventListener("DOMContentLoaded", () => {
    const token = getCookie('token');
    const profileContainer = document.querySelector(".profile-on-header");


    if (token) {
        console.log('Есть токен')
        // Делаем запрос к API для получения данных о пользователе
        fetch("http://localhost:5000/api/auth/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                console.log(data.username)
                profileContainer.innerHTML = `
            <button class="popup-btn">
                <img class="addPOST" src="img/addpost.svg">
            
            </button>
            
            <h2 id="names">
                ${data.username}
            </h2> <!-- для имени -->
            <div class="menu-wrapper">
                
            <button style="all: unset;" id="profile-button">
                <img class="PROFimg" src="img/profile.svg" id="progIMG">
            </button>
                <div class="menu hidden-menu" id="menu">
                    <div class="menu-button">
                    <img src="img/profile-ico.svg">
                    <span>my profile</span>
                    </div>
            
                    <div class="menu-button">
                    <img src="img/notifacion-ico.svg">
                    <span>notification</span>
                    </div>
            
                    <span class="menu-bottom bottom-switch">
                    <div class="theme-toggle">
                        <img src="img/sun-ico.svg">
                        <div class="switch" id="themeSwitch">
                        <div class="switch-circle"></div>
                        </div>
                        <img src="img/moon-ico.svg">
                    </div>
            
            
                    <div class="menu-exit">
                        <img src="img/door-ico.svg">
                        <span>exit</span>
                    </div>
                    </span>
            
            
                </div>
            </div>
                `;

                const popupBtn = document.querySelector('.popup-btn');
                const popup = document.getElementById('popup');
                const overlay = document.getElementById('overlay');
                const closeBtn = document.getElementById('closePopup');
                const exitBtn = document.getElementById('.menu-exit'); 

                popupBtn.addEventListener('click', () => {
                popup.classList.add('active');
                overlay.classList.add('active');
                });

                closeBtn.addEventListener('click', () => {
                popup.classList.remove('active');
                overlay.classList.remove('active');
                });

                overlay.addEventListener('click', () => {
                popup.classList.remove('active');
                overlay.classList.remove('active');
                });


                const toggleMenuBtn = document.getElementById('profile-button');
                const menu = document.getElementById('menu');
                 const themeSwitch = document.getElementById('themeSwitch');

                 toggleMenuBtn.addEventListener('click', () => {
                    menu.classList.toggle('hidden-menu');
                  });

                  document.addEventListener('click', (e) => {
                    if (!e.target.closest('.menu-wrapper')) {
                      menu.classList.add('hidden-menu');
                    }
                  });

                  themeSwitch.addEventListener('click', () => {
                    themeSwitch.classList.toggle('on');
                    document.body.classList.toggle('dark');
                  });
                  
                  exitBtn.addEventListener('click', () => {
                    window.location.href = '/logout';
                  });
                



            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
        });
    }
});




/*document.addEventListener('DOMContentLoaded', () => {
    const accessToken = getCookie('token');
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
*/