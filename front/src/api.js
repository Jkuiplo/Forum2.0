const API_URL = "http://localhost:3000/api/auth/register";

export async function registerUser(username, email, password) {
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    });

    return response.json();
}
