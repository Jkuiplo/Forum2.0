const uploadPostButton = document.getElementById('upload_post');
const postTitleInput = document.getElementById('post_title');
const postContentTextarea = document.getElementById('post_content');
const uploadFileInput = document.getElementById('upload_file_post');
const popup = document.getElementById('popup'); // Предполагается, что у вашего попапа есть ID 'popup'

function getCookie(name) {
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	if (match) return match[2];
	return null;  
}

const token = getCookie('token');

uploadPostButton.addEventListener('click', async () => {
	const title = postTitleInput.value.trim();
	const content = postContentTextarea.value.trim();
	const imageFile = uploadFileInput.files[0];

	if (!title || !content) {
	alert('Пожалуйста, введите заголовок и текст поста.');
	return;
	}

	const formData = new FormData();
	formData.append('title', title);
	formData.append('content', content);
	if (imageFile) {
	formData.append('image', imageFile);
	}

	try {
	const response = await fetch('/api/threads', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`
		// Важно: браузер сам установит Content-Type как multipart/form-data из объекта FormData
		// Если вы вручную установите Content-Type: 'application/json', отправка файлов не сработает!
		},
		body: formData,
		credentials: 'same-origin' // Это отправит куки вместе с запросом
	});

	if (response.ok) {
		const data = await response.json();
		alert('Пост успешно создан!');
		console.log('Ответ сервера:', data);
		// Очистите поля формы или закройте попап после успешной отправки
		postTitleInput.value = '';
		postContentTextarea.value = '';
		uploadFileInput.value = ''; // Сброс выбора файла
		popup.style.display = 'none'; // Если вы хотите скрыть попап после успешной отправки
		// Возможно, вам захочется обновить список постов на странице
	} else {
		const error = await response.json();
		alert(`Ошибка при создании поста: ${error.message || 'Неизвестная ошибка'}`);
		console.error('Ошибка сервера:', error);
	}
	} catch (error) {
	alert('Произошла ошибка при отправке запроса.');
	console.error('Ошибка отправки:', error);
	}
});

const closePopupButton = document.getElementById('closePopup');
if (closePopupButton) {
	closePopupButton.addEventListener('click', () => {
	popup.style.display = 'none'; // Скрываем попап при нажатии на кнопку закрытия
	});
}

// Добавьте здесь логику для открытия попапа, если у вас ее еще нет
// Например, по клику на какую-то кнопку "Создать пост"
const openPopupButton = document.getElementById('openPostPopup'); // Пример ID кнопки открытия
if (openPopupButton) {
	openPopupButton.addEventListener('click', () => {
	popup.style.display = 'block'; // Показываем попап
	});
}