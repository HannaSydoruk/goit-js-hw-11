
import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40573287-00ff0bf276edafd38916e1984';

function searchImages(queryTerm) {
    const PARAMS = `?key=${API_KEY}&q=${encodeURIComponent(queryTerm)}&image_type=photo&orientation=horizontal&safesearch=true`;
    const url = `${BASE_URL}${PARAMS}`;
    return axios.get(url)
        .then(response => response.data);
}

export { searchImages };