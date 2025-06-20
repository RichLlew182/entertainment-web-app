import { Media } from './classes/media.js';

async function getData(input) {

    console.log({ input })

    const url = "./data.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        localStorage.setItem('movie-data', JSON.stringify(json))

        if (input === undefined) {
            fetchAllData(json)
        } else {
            filterData(json, input)
        }

    } catch (error) {
        console.error(error.message);
    }
}

function fetchAllData(json) {

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

function filterData(json, input) {

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

function handleSearch(e) {

    searchResults.innerHTML = '';
    const searchVal = e.target.value.toLowerCase().trim();

    console.log(searchVal);

    if (searchVal === '' || searchVal.length < 3) {
        searchResults.innerHTML = '';
        recommendedWrapper.parentElement.parentElement.style.display = 'block';
        trendingWrapper.parentElement.parentElement.style.display = 'block';
    }

    if (searchVal != '' && searchVal.length >= 3) {
        recommendedWrapper.parentElement.parentElement.style.display = 'none';
        trendingWrapper.parentElement.parentElement.style.display = 'none';
        getData(searchVal);
    }

}


const recommendedWrapper = document.querySelector('#recommendedMovies .container .row');
const trendingWrapper = document.querySelector('#trendingMovies .container .row');
const searchResults = document.querySelector('#searchResults .container .row');

const movieInput = document.querySelector('#movieInput')
movieInput.addEventListener('input', handleSearch)

getData()