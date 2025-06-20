import { Media } from "../classes/media.js";

const recommendedWrapper = document.querySelector('#recommendedMovies .container .row');
const trendingWrapper = document.querySelector('#trendingMovies .container .row');

export function fetchAllData(json) {

    for (const val of json) {

        const movie = new Media(val);

        const movieCard = movie.movieCard();

        if (val.isTrending === true) {
            trendingWrapper.appendChild(movieCard)
        } else {
            recommendedWrapper.appendChild(movieCard);
        }
    }
}