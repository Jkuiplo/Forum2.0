const logo = document.getElementById("logo");
logo.addEventListener("click", () => {
	window.location.href = "/";
});

function getCookie(name) {
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	if (match) return match[2];
	return null;
}


const token2 = getCookie('token');
const profileContainer = document.querySelector(".profile-on-header");

if (token2) {
	fetch("http://localhost:5000/api/auth/me", {
		method: "GET",
		headers: {
			"Authorization": "Bearer " + token2
		}
	})
		.then(response => response.json())
		.then(data => {
			if (data.username) {
				console.log("зареган");
				// скрываем логин и регистрацию если есть токен
				const registerBlock = document.querySelector(".registers");
				registerBlock.style.display = "none";

				const profileBlock = document.querySelector(".profile-on-header");
				profileBlock.style.display = "flex";


				const name = document.getElementById("names");
				name.innerHTML = data.username;

				const avatar = document.getElementById("progIMG");
				avatar.src = data.avatar || "/public/img/profile.svg";
			}
		})
		.catch(error => {
			console.error("Ошибка:", error);
		});
}
else {
	console.log("Не авторизован");
}

