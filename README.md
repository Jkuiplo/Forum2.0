📂 aiu-forum/
┣ 📂 backend/
┃ ┣ 📂 routes/ (роуты API)
┃ ┃ ┣ 📄 authRoutes.js – регистрация, логин
┃ ┃ ┣ 📄 threadRoutes.js – API тредов
┃ ┃ ┣ 📄 commentRoutes.js – API комментариев
┃ ┃ ┣ 📄 uploadRoutes.js – загрузка файлов
┃ ┣ 📂 controllers/ (логика API)
┃ ┃ ┣ 📄 authController.js
┃ ┃ ┣ 📄 threadController.js
┃ ┃ ┣ 📄 commentController.js
┃ ┃ ┣ 📄 uploadController.js
┃ ┣ 📂 models/ (модели SQLite)
┃ ┃ ┣ 📄 User.js
┃ ┃ ┣ 📄 Thread.js
┃ ┃ ┣ 📄 Comment.js
┃ ┣ 📄 server.js – главный файл
┃ ┣ 📄 .env – настройки (JWT, API ключи)
┃ ┣ 📄 database.js – подключение к SQLite
┣ 📂 frontend/
┃ ┣ 📂 src/
┃ ┃ ┣ 📂 pages/ (страницы форума)
┃ ┃ ┣ 📂 components/ (хедер, формы)
┃ ┃ ┣ 📄 App.js – маршрутизация
┃ ┣ 📄 package.json (React)
┣ 📄 .gitignore
┣ 📄 README.md


Пользователи (/api/users)
    POST /register – регистрация по e-mail + пароль
    POST /login – вход по e-mail + пароль
    POST /google – вход через Google
    GET /me – получить текущего пользователя
    POST /logout – выйти

Треды (/api/threads)
    GET / – получить список тредов
    POST / – создать новый тред
    GET /:id – получить тред по ID
    DELETE /:id – удалить тред

Комментарии (/api/comments)
    GET /:threadId – получить комментарии к треду
    POST /:threadId – добавить комментарий
    DELETE /:id – удалить комментарий

Файлы (изображения/видео) (/api/uploads)
    POST /upload – загрузка файла
    GET /:filename – получить файл
