async function getData(input) {

    console.log({ input })

    const url = "./data.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

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

        const column = document.createElement('div');

        const movieDiv = document.createElement('div');
        movieDiv.setAttribute('class', 'movie-card');

        column.appendChild(movieDiv)

        const movieTitle = document.createElement('h3');
        const movieYear = document.createElement('p');
        const movieRating = document.createElement('p');
        const movieCategory = document.createElement('p');

        const movieImageWrapper = document.createElement('picture');
        movieImageWrapper.classList.add('thumbnail');

        movieImageWrapper.innerHTML = `<source media="(max-width: 767px)" srcset="${this.thumbnail.regular.small}" />
                                        <source media="(min-width: 768px)" srcset="${this.thumbnail.regular.large}" />
                                        <img src="${this.thumbnail.regular.large}" alt="${this.title}" />`

        const bookmarkButton = document.createElement('button')
        const bookMarkIcon = document.createElement('img');
        bookmarkButton.setAttribute('class', 'btn bookmark border-0')
        bookmarkButton.appendChild(bookMarkIcon);

        movieTitle.innerText = this.title;
        movieTitle.classList.add('movie-title');

        movieYear.innerText = this.year;
        movieYear.classList.add('movie-year');

        movieRating.innerText = this.rating;
        movieRating.classList.add('movie-rating');

        if (this.isBookmarked) {
            bookMarkIcon.src = './assets/icon-bookmark-full.svg'
        } else {
            bookMarkIcon.src = './assets/icon-bookmark-empty.svg'
        }

        if (this.isTrending) {
            movieDiv.classList.add('trending');
            column.setAttribute('class', 'col-12 col-sm-6 col-md-4');
        } else {
            column.setAttribute('class', 'col-12 col-sm-6 col-md-3');
        }

        if (this.category === 'Movie') {
            movieCategory.innerHTML = `<img src='./assets/icon-nav-movies.svg'> <span>${this.category}</span>`;
        } else {
            movieCategory.innerHTML = `<img src='./assets/icon-nav-tv-series.svg'> <span>${this.category}</span>`;
        }

        movieCategory.classList.add('movie-category');

        movieDiv.append(movieImageWrapper, bookmarkButton, movieTitle, movieYear, movieCategory, movieRating);

        return column

    }

}

const recommendedWrapper = document.querySelector('#recommendedMovies .container .row');
const trendingWrapper = document.querySelector('#trendingMovies .container .row');
const searchResults = document.querySelector('#searchResults .container .row');

const movieInput = document.querySelector('#movieInput')
movieInput.addEventListener('input', handleSearch)

getData()