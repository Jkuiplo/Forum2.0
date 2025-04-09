const API_URL = "http://localhost:4000/api/auth/register";

async function registerUser(username, email, password) {
	const response = await fetch(`${API_URL}`, {
	    method: "POST",
	    headers: {
		"Content-Type": "application/json",
	    },
	    body: JSON.stringify({ username, email, password }),
	});
    
	return response.json();
    }
    
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        const alert = document.getElementById("alert")

        if (password != confirm){
            alert.innerText= "Пароли не совпадают!";
        }
        else{
            const result = await registerUser(username, email, password);

            if (result.message=="Ошибка: SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email") {
                console.log(result.message);
                alert.innerText="Эта почта уже используется";
            }
            if (result.message=="Ошибка: SQLITE_CONSTRAINT: UNIQUE constraint failed: users.username") {
                console.log(result.message);
                alert.innerText="Этот ник уже используется";
            }
            if (result.message=="Пользователь зарегестрирован"){
                window.location.href = "/login";
            }
        }
    });
});