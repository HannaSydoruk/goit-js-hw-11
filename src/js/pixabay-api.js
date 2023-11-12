
import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '40573287-00ff0bf276edafd38916e1984';

function searchImages(queryTerm, page, perPage) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: queryTerm,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: perPage
    })
    const url = `?${params}`;
    return axios.get(url)
        .then(response => response.data);
}

export { searchImages };