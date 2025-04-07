console.log('я тут')
document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("login-form");
    
	form.addEventListener("submit", async (e) => {
	    e.preventDefault();
    
	    const email = document.getElementById("email").value;
	    const password = document.getElementById("password").value;
    
	    console.log("Отправка запроса...");
    
	    try {
		const res = await fetch("/api/auth/login", {
		    method: "POST",
		    headers: { "Content-Type": "application/json" },
		    body: JSON.stringify({ email, password })
		});
    
		const data = await res.json();
		console.log("Ответ сервера:", data);
    
		if (res.ok) {
		    localStorage.setItem("token", data.token);
		    window.location.href = "/";
		} else {
		    document.getElementById("message").innerText = data.message;
		}
	    } catch (error) {
		console.error("Ошибка запроса:", error);
		document.getElementById("message").innerText = "Ошибка сети";
	    }
	});
    });
    