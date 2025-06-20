import { Media } from '../classes/media.js';

export function filterData(json, input) {

    const searchResults = document.querySelector('#searchResults .container .row');

    const filtered = json.filter((e) => e.title.toLowerCase().includes(input));

    const ResultsHeading = document.createElement('h2');
    ResultsHeading.innerHTML = `Found ${filtered.length} Results for '${input}'`;
    searchResults.append(ResultsHeading);

    for (const val of filtered) {
        const movie = new Media(val);
        const movieCard = movie.movieCard();

        searchResults.append(movieCard);
    }
}