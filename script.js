async function getData() {
    const url = "./data.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        handleData(json)

    } catch (error) {
        console.error(error.message);
    }
}

const wrapper = document.querySelector('#movies');

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

        const movieTitle = document.createElement('h2');
        const movieYear = document.createElement('p');
        const movieImages = document.createElement('div');
        const movieRating = document.createElement('p');
        const movieCategory = document.createElement('p')
        console.log(movieImages);

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

function handleData(data) {

    for (const val of data) {
        // const { title, thumbnail, year, category, rating, isBookmarked, isTrending } = val;
        const movie = new Movie(val);
        console.log(movie);
        const movieCard = movie.movieCard();
        wrapper.appendChild(movieCard)
    }

}

getData()