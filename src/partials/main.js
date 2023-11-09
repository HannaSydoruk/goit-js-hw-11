import { searchImages } from "./pixabay-api";

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

searchFormEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    galleryEl.innerHTML = '';
    const queryTerm = e.target.searchQuery.value;

    searchImages(queryTerm)
        .then((res) => {
            if (res.hits.length) {
                galleryEl.innerHTML = createMarkup(res.hits);
            }
            else { alert('Sorry, there are no images matching your search query. Please try again.') }
        })
};

function createMarkup(arrayOfImages) {
    return arrayOfImages.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                    <b>Likes: ${likes}</b>
                    </p>
                    <p class="info-item">
                    <b>Views: ${views}</b>
                    </p>
                    <p class="info-item">
                    <b>Comments: ${comments}</b>
                    </p>
                    <p class="info-item">
                    <b>Downloads: ${downloads}</b>
                    </p>
                </div>
                </div>`
    }).join();
}





