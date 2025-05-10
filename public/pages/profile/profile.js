
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
}
const token = getCookie('token');

async function getUserData() {
    if (token) {
        fetch("http://localhost:5000/api/auth/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.username) {
                    const userName = document.getElementById('profile-name');
                    userName.innerHTML = data.username;

                    const avatar = document.getElementById('profile-image');
                    avatar.src = data.avatar || "/public/img/profile.svg";
                    console.log(data);
                }
            })
            .catch(error => {
                console.error("Ошибка:", error);
            });
    }
    else {
        console.log("Не авторизован");
    }
}
getUserData().then(data => {

});


// ---------------- menu active tab









