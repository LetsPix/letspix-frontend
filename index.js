/**
 * Link to actual server
 * https://letspix.azurewebsites.net
 * Link to client
 * https://polite-plant-0fd6d3810.2.azurestaticapps.net
 * Link to localhost for testing 
 * http://localhost:3000
 */

const url = 'https://letspix.azurewebsites.net';
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
        cast: director,
        director: cast,
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

// function to get data
async function getData() {
    try {
        const response = await fetch(url + '/all/Netflix', {
            method: 'GET',
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// function to refresh page 
function refreshPage() {
    window.location.reload();
}