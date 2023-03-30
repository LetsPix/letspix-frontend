/**
 * Link to actual server
 * https://letspix.azurewebsites.net/
 * Link to client
 * https://polite-plant-0fd6d3810.2.azurestaticapps.net
 * Link to localhost for testing 
 * http://localhost:3000
 */

const url = 'http://localhost:3000';

// Sending the data to the server to create a new media
async function createNewMedia() {
    var getDate = new Date();
    var mediaType = document.getElementById("mediaType").value;
    var title = document.getElementById("title").value;
    var director = document.getElementById("director").value;
    var cast = document.getElementById("cast").value;
    var country = document.getElementById("country").value;
    var releaseYear = document.getElementById("releaseYear").value;
    var rating = document.getElementById("rating").value;
    var duration = document.getElementById("mediaInfo").value;
    var seasonMins = document.getElementById("seasonMins").value;
    var genre = document.getElementById("genre").value;
    var mediaDescription = document.getElementById("mediaDescription").value;
    var streamingService = document.getElementById("streamingService").value;

    // schema WILL COME BACK TO THIS - BF
    var newMedia = {
        type: mediaType,
        title: title,
        cast: cast,
        director: director,
        country: country,
        date_added: getDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}), // this will just get the current tim
        release_year: releaseYear,
        rating: rating,
        duration: duration + " " + seasonMins,
        listed_in: genre,
        description: mediaDescription,
        service: streamingService
    };

    // sending the data
    const formInfo = document.getElementById('myForm');
    if (formInfo.checkValidity()) {
        try {
            const response = await fetch(url + '/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMedia)
            });
            const submitButton = document.getElementById('buttonSubmit');
            submitButton.style.display = 'none';
            document.getElementById("createResults").innerHTML = `${title} Created Successfully.`;
            document.getElementById('goAgain').removeAttribute('hidden');
        } catch (error) {
            document.getElementById("createResults").innerHTML = `Failed to create ${title}.`;
        }
    }
}

// function to read the data from the /all/Netflix endpoint (this grabs all shows and movies on Netflix)
async function getData() {
    try {
        const response = await fetch(url + '/api/all', {
            method: 'GET',
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// function to read data pertaining to a specific film. Filters by title.
async function getMovieTitle() {
    const mediaTitle = document.getElementById("searchBar").value;
    try {
        const response = await fetch(url + '/api/findtitle', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: mediaTitle })
        });
        const data = await response.json();
        document.getElementById("searchType").innerHTML = data.type;
        document.getElementById("searchTitle").innerHTML = data.title;
        document.getElementById("searchCast").innerHTML = data.cast;
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// function to refresh page 
function refreshPage() {
    window.location.reload();
}