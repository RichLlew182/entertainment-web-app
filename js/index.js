import { getData } from './services/getData.js';

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

const searchResults = document.querySelector('#searchResults .container .row');
const recommendedWrapper = document.querySelector('#recommendedMovies .container .row');
const trendingWrapper = document.querySelector('#trendingMovies .container .row');

const movieInput = document.querySelector('#movieInput')
movieInput.addEventListener('input', handleSearch)

getData()