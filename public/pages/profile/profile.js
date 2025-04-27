// ---------------- postData
const postData = [{ // BACKEND меняеш данные о постах
    id: 1,
    user: 'Daniel',
    comment: 'lorem ipsum disyngo koroche',
    likes: 3,
    image: '/public/img/profile.png'
},
{
    id: 2,
    user: 'Daniel',
    comment: 'lorem ipsum disyngo koroche',
    likes: 3,
    image: '/public/img/profile.png'
},
{
    id: 3,
    user: 'Daniel',
    comment: 'lorem ipsum disyngo koroche',
    likes: 3,
    image: '/public/img/profile.png'
},
{
    id: 4,
    user: 'Daniel',
    comment: 'lorem ipsum disyngo koroche',
    likes: 3,
    image: '/public/img/profile.png'
},
{
    id: 5,
    user: 'Daniel',
    comment: 'lorem ipsum disyngo koroche',
    likes: 3,
    image: '/public/img/profile.png'
},
]

const postsDIV = document.getElementById('profile_posts')


postData.forEach(item => {
    const post = document.createElement('div');
    post.className = 'profile-post';
    post.innerHTML = `
    <img class='avatar' src='${item.image}' alt=''/>
    <div class='info'>
      <h3>${item.user}</h3>
      <p>${item.comment}</p>
      <span><img src='/img/thumb_up.svg'/> ${item.likes}</span>
    </div>
    `;
    postsDIV.append(post);
});


// ---------------- menu active tab

const menu = document.getElementsByClassName('section-menu')

// ---------------- setting user 

const profileName = 'Aidyn' // BACKEND - имя пользователя 
const profileFollowers = 12 // BACKEND - подписчики пользователя 
const profileImage = '/img/images.jpeg'  // BACKEND - изображение пользователя 

const profileNameDIV = document.getElementById('profile-name')
const profileFollowersDIV = document.getElementById('profile-followers')
const profileImageDIV = document.getElementById('profile-image')

profileNameDIV.innerHTML = profileName
profileFollowersDIV.innerHTML = profileFollowers
profileImageDIV.src = profileImage






