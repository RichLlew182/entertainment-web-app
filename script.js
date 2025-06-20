async function getData() {
    const url = "./data.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        for (const val of json) {

            const movie = new Media(val);

            const movieCard = movie.movieCard();

            if (val.isTrending === true) {
                trendingWrapper.appendChild(movieCard)
            } else {
                recommendedWrapper.appendChild(movieCard);
            }
        }

    } catch (error) {
        console.error(error.message);
    }
}

async function searchData(input) {
    const url = "./data.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        const filtered = json.filter((e) => e.title.toLowerCase().includes(input));

        const ResultsHeading = document.createElement('h2');
        ResultsHeading.innerHTML = `Found ${filtered.length} Results for '${input}'`;
        searchResults.append(ResultsHeading);

        for (const val of filtered) {
            const movie = new Media(val);
            const movieCard = movie.movieCard();

            searchResults.append(movieCard);
        }


    } catch (error) {
        console.error(error.message);
    }
}


const movieInput = document.querySelector('#movieInput')

movieInput.addEventListener('input', function (e) {


    searchResults.innerHTML = '';
    e.preventDefault()
    const searchVal = e.target.value.toLowerCase().trim();

    console.log(searchVal);

    if (searchVal === '' || searchVal.length < 1) {

        searchResults.innerHTML = '';
        getData();
    }

    if (searchVal != '' && searchVal.length >= 3) {

        setTimeout(() => {
            recommendedWrapper.innerHTML = '';
            trendingWrapper.innerHTML = ''
            searchData(searchVal);
        }, 1000);


    }

})

class Media {

    constructor(moveieData) {
        this.title = moveieData.title;
        this.thumbnail = moveieData.thumbnail;
        this.year = moveieData.year;
        this.category = moveieData.category;
        this.rating = moveieData.rating;
        this.isBookmarked = moveieData.isBookmarked;
        this.isTrending = moveieData.isTrending;
    }

    movieCard() {

        const columns = document.createElement('div');
        columns.setAttribute('class', 'col-12 col-sm-6 col-md-4');

        const movieDiv = document.createElement('div');
        movieDiv.setAttribute('class', 'movie-card');

        columns.appendChild(movieDiv)

        const movieTitle = document.createElement('h3');
        const movieYear = document.createElement('p');
        const movieImages = document.createElement('div');
        const movieRating = document.createElement('p');
        const movieCategory = document.createElement('p');
        const bookmarkButton = document.createElement('button')

        const bookMarkIcon = document.createElement('img');

        bookmarkButton.setAttribute('class', 'btn bookmark border-0')

        bookmarkButton.appendChild(bookMarkIcon)

        if (this.isBookmarked === true) {
            bookMarkIcon.src = './assets/icon-bookmark-full.svg'
        } else {
            bookMarkIcon.src = './assets/icon-bookmark-empty.svg'
        }

        movieTitle.innerText = this.title;
        movieTitle.classList.add('movie-title');

        movieYear.innerText = this.year;
        movieYear.classList.add('movie-year');

        movieRating.innerText = this.rating;
        movieRating.classList.add('movie-rating');

        movieCategory.innerText = this.category;
        movieCategory.classList.add('movie-category');

        movieImages.classList.add('thumbnail');
        movieImages.style.backgroundImage = `url(${this.thumbnail.regular.large})`

        movieDiv.append(movieImages, bookmarkButton, movieTitle, movieYear, movieCategory, movieRating);

        return columns

    }

}

const recommendedWrapper = document.querySelector('#recommendedMovies .container .row');
const trendingWrapper = document.querySelector('#trendingMovies .container .row');
const searchResults = document.querySelector('#searchResults .container .row')

getData()