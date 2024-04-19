const searchInput = document.querySelector('#search');
const btn = document.querySelector('#btn');
const imageContainer = document.querySelector('#images-container');
const tempUrl = 'https://api.unsplash.com/search/photos?page=1&query=office'
const key = '7B7ouV2QXckqGY8Y2F513wtSutkDYnUG2CNUJIQyk7w';
const showMore = document.querySelector('#show-more');
let prevKeyword="";//added line
let pageNo = 1;



async function getData(keyword) {
    if(prevKeyword!=keyword){             //added if condition
        imageContainer.innerHTML="";
    }
    let response = await fetch(`https://api.unsplash.com/search/photos?page=${pageNo}&query=${keyword}&client_id=${key}`);
    let data = await response.json();
    showData(data);
}
function showData(datata) {
    datata.results.forEach(photo => {
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');
        imageContainer.appendChild(imageCard);
        imageCard.innerHTML = `
        <div class="img-box">
                <img src="${photo.urls.small}" alt="">
             </div>
             <div class="details-box">
                <p class="details">${photo.alt_description}</p>
             </div>
        `

       showMore.style.display='block';

    });
}



btn.addEventListener('click', (e) => {
    getData(searchInput.value);
    e.preventDefault();
})


showMore.addEventListener('click', (e) => {
    prevKeyword=searchInput.value;//added line
    pageNo++;
    getData(searchInput.value);
    e.preventDefault();
})
