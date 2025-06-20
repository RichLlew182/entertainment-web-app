async function getData() {
    const url = "./data.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        // console.log(json);

        for (const val of json) {
            // const { title, thumbnail, year, category, rating, isBookmarked, isTrending } = val;
            const movie = new Movie(val);
            // console.log(movie);
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

        const filtered = json.filter((e) => e.title.includes(input));

        for (const val of filtered) {
            const movie = new Movie(val);
            const movieCard = movie.movieCard();

            searchResults.appendChild(movieCard);
        }




    } catch (error) {
        console.error(error.message);
    }
}


const movieInput = document.querySelector('#movieInput')

movieInput.addEventListener('input', function (e) {

    e.preventDefault()
    const searchVal = e.target.value.trim();

    console.log(searchVal);

    if (searchVal === '') {
        searchResults.innerHTML = '';
        getData()
    }

    if (searchVal != '' && searchVal.length > 2) {

        recommendedWrapper.innerHTML = '';
        trendingWrapper.innerHTML = ''
        searchData(searchVal)
    }

})

class Movie {

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

        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie-card')

        const movieTitle = document.createElement('h3');
        const movieYear = document.createElement('p');
        const movieImages = document.createElement('div');
        const movieRating = document.createElement('p');
        const movieCategory = document.createElement('p')
        // console.log(movieImages);

        const bookMarkIcon = document.createElement('img');
        bookMarkIcon.classList.add('bookmark');

        if (this.isBookmarked === true) {
            bookMarkIcon.src = './assets/icon-bookmark-full.svg'
        } else {
            bookMarkIcon.src = './assets/icon-bookmark-empty.svg'
        }

        movieTitle.innerText = this.title;
        movieYear.innerText = this.year;
        movieRating.innerText = this.rating;
        movieCategory.innerText = this.category;
        movieImages.classList.add('thumbnail')
        movieImages.style.backgroundImage = `url(${this.thumbnail.regular.large})`

        movieDiv.append(movieImages, bookMarkIcon, movieTitle, movieYear, movieCategory, movieRating);

        return movieDiv

    }

}

const recommendedWrapper = document.querySelector('#recommendedMovies');
const trendingWrapper = document.querySelector('#trendingMovies');
const searchResults = document.querySelector('#searchResults')

getData()