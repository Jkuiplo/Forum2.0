document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Установка токена в куки
        document.cookie = `token=${data.token}; path=/; max-age=86400; samesite=strict`;
        // Перенаправление
        window.location.href = "/";
      } else {
        document.getElementById("message").innerText = data.message;
      }
    } catch (error) {
      console.error("Ошибка:", error);
      document.getElementById("message").innerText = "Ошибка сети";
    }
  });
});
