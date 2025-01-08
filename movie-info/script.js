const key = "71d45c44"
let searchInput = document.getElementById("search-input")
let searchBtn = document.getElementById("search-btn")
let result = document.getElementById("result")

//function to fetch data from api
let getMovie = () => {
    let movieName = searchInput.value
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`

    //if input field is empty
    if (movieName.length <= 0) {
        result.innerHTML = /*html*/ `<h3 class="msg">Please enter a movie name </h3>`
    }

    //if input isn't empty
    else {
        fetch(url).then((result) => result.json()).then((data) => {
            //if movie exist in database
            if (data.Response == "True") {
                result.innerHTML = /*html*/ `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `
            }

            //if movie doesn't exist in database
            else {
                result.innerHTML = /*html*/ `<h3 class="msg">${data.Error}</h3>`
            }
        })

            //if error occurs
            .catch(() => {
                result.innerHTML = /*html*/ `<h3 class="msg">Error Occured</h3>`
            })
    }
}

searchBtn.addEventListener("click", getMovie)
window.addEventListener("load", getMovie)
searchInput.addEventListener('keyup', event => (event.key === 'Enter') && getMovie())