import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { searchImages } from "./pixabay-api";


const PER_PAGE = 3;
const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreEl = document.querySelector('.load-more');

let page = 1;
let maxPages = 1;

searchFormEl.addEventListener('submit', onSubmit);
loadMoreEl.addEventListener('click', onLoadMore);

let lightbox = new SimpleLightbox('.gallery > div > a', { /* options */ });

function onSubmit(e) {
    e.preventDefault();
    page = 1;
    galleryEl.innerHTML = '';
    const queryTerm = getSearchTerm();
    hideEl(loadMoreEl);

    searchImages(queryTerm, page, PER_PAGE)
        .then((res) => {
            maxPages = Math.ceil(res.totalHits / PER_PAGE);

            if (res.hits.length) {
                galleryEl.innerHTML = createMarkup(res.hits);
                showEl(loadMoreEl);

                lightbox.refresh();
            }
            else {
                alert('Sorry, there are no images matching your search query. Please try again.')
            }

            if (maxPages === page) {
                hideEl(loadMoreEl);
                alert("We're sorry, but you've reached the end of search results.")
            }
        })
};

function createMarkup(arrayOfImages) {
    return arrayOfImages.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
                <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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

function getSearchTerm() {
    return searchFormEl.searchQuery.value;
}

function onLoadMore() {
    const queryTerm = getSearchTerm();
    page += page;
    searchImages(queryTerm, page, PER_PAGE)
        .then((res) => {
            if (maxPages === page) {
                hideEl(loadMoreEl);
                alert("We're sorry, but you've reached the end of search results.")
            };
            galleryEl.insertAdjacentHTML("beforeend", createMarkup(res.hits));
            lightbox.refresh();
        })
}

function hideEl(el) {
    el.classList.add('hidden');
}

function showEl(el) {
    el.classList.remove('hidden');
}




