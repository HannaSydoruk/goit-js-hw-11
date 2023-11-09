import { searchImages } from "./pixabay-api";

const searchFormEl = document.querySelector('#search-form');

searchFormEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    const queryTerm = e.target.searchQuery.value;

    searchImages(queryTerm)
        .then((res) => {
            console.log(res);
        })
};



