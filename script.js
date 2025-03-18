const APIKey = "b61f5b16";
const APIUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=b61f5b16"



/** Title Search  **/

document.getElementById("title-search-btn").addEventListener("click", () => {
    const title = document.getElementById("title").value.trim();
    const year = document.getElementById("year").value.trim();
    const plot = document.getElementById("title-plot").value;

    if (title) {
        searchByTitle(title, year, plot);
    }
});

document.getElementById("title-reset-btn").addEventListener("click", () => {
    document.getElementById("title").value = "";
    document.getElementById("year").value = "";
    document.getElementById("title-plot").value = "short";
    document.getElementById("moviesContainer").innerHTML = "";
});


async function searchByTitle(title, year, plot){
    try {
        const response = await fetch(`${APIUrl}&s=${title}&y=${year}&plot=${plot}`);
        const data = await response.json();

        console.log(data); // Log the entire data to inspect it

        // Check if the response is valid and contains a 'Search' array
        if (data.Response === "True" && Array.isArray(data.Search)) {
            // If we have movies, display them
            if (data.Search.length > 0) {
                displayMovies(data.Search);
            } else {
                // No movies found
                document.getElementById("moviesContainer").innerHTML = `<p>No movies found.</p>`;
            }
        } else {
            // If the 'Response' is not 'True' or 'Search' is undefined
            document.getElementById("moviesContainer").innerHTML = `<p>No movies found.</p>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


/** ID Search  **/
document.getElementById("id-search-btn").addEventListener("click", () => {
    const id = document.getElementById("id").value.trim();
    const plot = document.getElementById("id-plot").value;

    if (id) {
        searchByID(id, plot);
    }
});

document.getElementById("id-reset-btn").addEventListener("click", () => {
    document.getElementById("id").value = "";
    document.getElementById("id-plot").value = "short";
    document.getElementById("moviesContainer").innerHTML = "";
});

// ** Function to search by ID **
async function searchByID(id, plot) {
    try {
        const response = await fetch(`${API_URL}&i=${id}&plot=${plot}`);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovieDetails(data);
        } else {
            document.getElementById("moviesContainer").innerHTML = `<p>No movie found.</p>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


// ** Function to display multiple movies (Title Search Results) **
function displayMovies(movies) {
    let moviesContainer = document.getElementById("moviesContainer");
    moviesContainer.innerHTML = ""; // Clear previous results

    movies.forEach(movie => {
        let movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;
        moviesContainer.appendChild(movieElement);
    });
}

function displayMovieDetails(movie) {
    let movieContainer = document.getElementById("moviesContainer");
    movieContainer.innerHTML = ""; // Clear previous results

    let movieElement = document.createElement("div");
    movieElement.classList.add("movie-details");
    movieElement.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
    `;
    movieContainer.appendChild(movieElement);
}
