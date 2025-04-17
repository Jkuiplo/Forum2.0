function timeAgo(timestamp) {
	const now = Date.now();
	const seconds = Math.floor(((now - timestamp) / 1000)-18000);
      
	const intervals = [
	  { label: 'год', seconds: 31536000 },
	  { label: 'месяц', seconds: 2592000 },
	  { label: 'день', seconds: 86400 },
	  { label: 'час', seconds: 3600 },
	  { label: 'минута', seconds: 60 },
	  { label: 'секунда', seconds: 1 },
	];
      
	for (const i of intervals) {
	  const count = Math.floor(seconds / i.seconds);
	  if (count >= 1) {
	    return `${count} ${decline(i.label, count)} назад`;
	  }
	}
      
	return 'только что';
      }
      
      function decline(word, count) {
	const forms = {
	  'секунда': ['секунда', 'секунды', 'секунд'],
	  'минута': ['минуту', 'минуты', 'минут'],
	  'час': ['час', 'часа', 'часов'],
	  'день': ['день', 'дня', 'дней'],
	  'месяц': ['месяц', 'месяца', 'месяцев'],
	  'год': ['год', 'года', 'лет']
	};
      
	const mod10 = count % 10;
	const mod100 = count % 100;
	const form = (mod10 === 1 && mod100 !== 11) ? 0 :
		     (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) ? 1 : 2;
      
	return forms[word][form];
      }
      

document.addEventListener('DOMContentLoaded', () => {
	// Элемент, куда мы будем вставлять треды
	const postsContainer = document.getElementById('posts-container'); // Убедитесь, что у вас есть такой контейнер на странице.
    
	// Функция для загрузки и отображения всех тредов
	async function loadThreads() {
	    try {
		const response = await fetch('/api/threads', {
		    method: 'GET',
		    credentials: 'same-origin' // Отправка куки с запросом
		});
    
		if (response.ok) {
		    const threads = await response.json();
		    console.log('Треды:', threads);

		    // Очищаем контейнер перед добавлением новых тредов
		    postsContainer.innerHTML = '';
    
		    // Перебираем все треды и создаем HTML для каждого
		    threads.forEach(thread => {
			const postElement = document.createElement('div');
			postElement.classList.add('post');
    
			console.log(thread.image);
			const isoDate = thread.created_at.replace(' ', 'T');
			const timestamp = new Date(isoDate).getTime();
			const readableTime = timeAgo(timestamp);
			if(thread.image){
				postElement.innerHTML = `
				<span class="toppost">
					<div class="profile_on_post" id="profile_on_postID">
					</div>
					<span class="main_text_post">
					<span class="title_post">
						<h2>${thread.title}</h2>
					</span>
					<span class="text_post_main">
						${thread.content}
					</span>
					</span>
				</span>
				<span class="middlepost">
					<span class="post_content">
					<img src="${thread.image || ''}" id="CONT_POST"  class="postImage">
					</span>
				</span>
				<span class="bottompost">
					<span id="likes">
						<img src="/img/thumb_up.svg">
						<a id="like_num">0<a>
						<img src="/img/thumb_down.svg">
						<a id="dislike_num">0<a>
						<img src="/img/comment.svg">
						<a id="dislike_num">0<a>
					</span>
					
					<span id="date">${readableTime}</span>
				</span>
				`;
				
			}
			else{

			postElement.innerHTML = `
			<span class="toppost">
				<div class="profile_on_post" id="profile_on_postID">
				</div>
				<span id="date">${readableTime}</span>
				<span class="main_text_post">
				<span class="title_post">
					<h2>${thread.title}</h2>
				</span>
				<span class="text_post_main">
					${thread.content}
				</span>
				</span>
			</span>
			<span class="bottompost">
				<!-- кнопки и т.п. -->
			</span>
			`;
			}
    
			// Добавляем элемент на страницу
			postsContainer.appendChild(postElement);
		    });
		} else {
		    const error = await response.json();
		    console.error('Ошибка при загрузке тредов:', error.message || 'Неизвестная ошибка');
		}
	    } catch (error) {
		console.error('Ошибка сети при загрузке тредов:', error);
	    }
	}
    
	// Загружаем треды при загрузке страницы
	loadThreads();
    });
    