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

const popupBtn = document.querySelector('.popup-btn');
    const popup = document.getElementById('popup');
    const overlay_popup = document.getElementById('overlay-popup');
    const closeBtn = document.getElementById('closePopup');

    popupBtn.addEventListener('click', () => {
      popup.classList.add('active');
      overlay_popup.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      popup.classList.remove('active');
      overlay_popup.classList.remove('active');
    });

    overlay_popup.addEventListener('click', () => {
      popup.classList.remove('active');
      overlay_popup.classList.remove('active');
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

    function openModal() {
      const overlay = document.getElementById("modalOverlay");
      const modal = document.getElementById("modalWindow");
      overlay.style.display = "flex";
      modal.classList.remove("fade-out");
      console.log("Clicked!");
    }
    
    function closeModal() {
      const overlay = document.getElementById("modalOverlay");
      const modal = document.getElementById("modalWindow");
      modal.classList.add("fade-out");
      setTimeout(() => {
        overlay.style.display = "none";
        modal.classList.remove("fade-out");
      }, 300);
    }
    
    function handleOverlayClick(event) {
      if (event.target.id === "modalOverlay" || event.target.closest("#close_btn_login")) {
        closeModal();
      }
    }
    
    // Назначаем обработчики
    document.getElementById("login_on_head").addEventListener("click", openModal);
    document.getElementById("modalOverlay").addEventListener("click", handleOverlayClick);
    document.getElementById("close_btn_login").addEventListener("click", closeModal);


     // Функции для работы модального окна регистрации
  function openRegisterModal() {
    const overlay = document.getElementById("registerOverlay");
    const modal = document.getElementById("registerModal");
    overlay.style.display = "flex";
    modal.classList.remove("register-fade-out");
  }

  function closeRegisterModal() {
    const overlay = document.getElementById("registerOverlay");
    const modal = document.getElementById("registerModal");
    modal.classList.add("register-fade-out");
    setTimeout(() => {
      overlay.style.display = "none";
      modal.classList.remove("register-fade-out");
    }, 300);
  }

  function handleRegisterOverlayClick(event) {
    if (event.target.id === "registerOverlay" || event.target.closest("#registerCloseBtn")) {
      closeRegisterModal();
    }
  }

  // Назначение обработчиков
  document.getElementById("register_on_head").addEventListener("click", openRegisterModal);
  document.getElementById("registerOverlay").addEventListener("click", handleRegisterOverlayClick);
  document.getElementById("registerCloseBtn").addEventListener("click", closeRegisterModal);
  
  document.getElementById("loginSwitchLink").addEventListener("click",closeRegisterModal,)
  document.getElementById("loginSwitchLink").addEventListener("click",openModal,)

  document.getElementById("register_swapper").addEventListener("click",closeModal,)
  document.getElementById("register_swapper").addEventListener("click",openRegisterModal,)
  