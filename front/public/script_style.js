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