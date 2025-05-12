const API_URL = "http://localhost:5000/api/users";

// Получить количество подписчиков
export async function getFollowersCount(userId) {
	const res = await fetch(`${API_URL}/${userId}/followers/count`);
	return res.json();
}

// Подписка/отписка
export async function toggleFollow(userId, token) {
	const res = await fetch(`${API_URL}/${userId}/follow`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${token}`
		}
	});

	return res.json();
}
