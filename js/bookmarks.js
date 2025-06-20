import { Media } from './classes/media.js';

function fetchLocalData() {

    const data = localStorage.getItem('movie-data');

    const json = JSON.parse(data);

    console.log(json);

    for (const val of json) {

        const movie = new Media(val);

        const movieCard = movie.movieCard();

        if (val.isBookmarked === true) {

            if (val.category === 'Movie') {

                bookmarkedMoviesWrapper.appendChild(movieCard)
            } else {
                bookmarkedSeriesWrapper.appendChild(movieCard);
            }
        }
    }

}

const bookmarkedMoviesWrapper = document.querySelector('#bookmarkedMovies .container .row');
const bookmarkedSeriesWrapper = document.querySelector('#bookmarkedSeries .container .row');


fetchLocalData();