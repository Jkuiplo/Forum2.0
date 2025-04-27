document.getElementById("toggleSidebar").addEventListener("click", function () {
    document.querySelector(".leftbar").classList.toggle("hidden");
});

document.querySelectorAll(".menu-btn").forEach(button => {
    button.addEventListener("click", () => {
        let submenu = button.nextElementSibling;
        let      isActive = submenu.classList.contains("active");

        document.querySelectorAll(".submenu").forEach(el => {
            el.classList.remove("active");
        });
        document.querySelectorAll(".menu-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        if (!isActive) {
            submenu.classList.add("active");
            button.classList.add("active");
        }
    });
});
/*
const popupBtn = document.querySelector('.popup-btn');
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closePopup');

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

*/
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
/*
    themeSwitch.addEventListener('click', () => {
      themeSwitch.classList.toggle('on');
      document.body.classList.toggle('dark');
    });
  */ 