/**
 * Link to actual server
 * https://letspix.azurewebsites.net/
 * Link to client
 * https://polite-plant-0fd6d3810.2.azurestaticapps.net
 * Link to localhost for testing 
 * http://localhost:3000
 */

const url = 'https://letspix.azurewebsites.net';
/**
* Note to myself: dont forget to change url back to 'https://letspix.azurewebsites.net' after testing!! - JB
*/

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

async function searchButton() {
    let table = document.getElementById("media_display_table");
    var rowCount = table.rows.length; // Thanks Mudasssar Khan from ASPSNIPPETS for this code deleting all but the first row of an HTML table
    if (document.getElementById("stream_rating").value == 'all') {
        var ratings = ['Netflix', 'TV-Y7', 'TV-PG', 'TV-14', 'TV-MA', 'G', 'PG', 'PG-13', 'R', 'NC-17']
    } else {
        var ratings = [document.getElementById("stream_rating").value]
    }
    //if (document.getElementById("stream_genre").value == 'all') {
        //var genres = ['Drama', 'Independent Movies', 'International Movies', 'International TV Shows', 'Documentaries', 'TV Drama',
        //'TV Mysteries', 'Crime TV Shows', 'TV Action & Adventure', 'Docuseries', 'Reality TV', 'TV Horror', 'TV Mysteries',
        //'Children & Family Movies', 'British TV Shows', 'Thrillers', 'Spanish-Language TV Shows']    
    //} else {
        //var genres = [document.getElementById("stream_genre").value]
    //}

    if (document.getElementById("stream_service").value == 'all') {
        var serviceURL = '/all'
        console.log(serviceURL)
    } else {
        var serviceURL = "/" + document.getElementById("stream_service").value + "/all"
        console.log(serviceURL)
    }

    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    try {
        getNetflixMediaData(ratings, serviceURL);
    } catch (error) {
        console.error(error);
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

async function displayTitles(data, mediaType, ratings, genres) {
    try {
        var table = document.getElementById("media_display_table");
        for (const item of data) {
            if (mediaType.includes(item.type) && ratings.includes(item.rating)) {
                var row = table.insertRow()
                var titleCell = row.insertCell(0);
                var typeCell = row.insertCell(1);
                var ratingCell = row.insertCell(2);
                var durationCell = row.insertCell(3);
                var listedInCell = row.insertCell(4);
                
                titleCell.innerHTML = item.title;
                typeCell.innerHTML = item.type;
                ratingCell.innerHTML = item.rating;
                durationCell.innerHTML = item.duration;
                listedInCell.innerHTML = item.listed_in;
            }
        }
    } catch(error) {
        console.error(error);
    }
}

// function to read the data from the /api/netflix/all endpoint - JB
// Thank you w3schools for the table methods info!
async function getNetflixMediaData(ratings, serviceURL) {
    try {
        const response = await fetch(url + '/api' + serviceURL, {
            method: 'GET',
        });
        const data = await response.json();
        console.log(data);
        let temp2 = document.getElementById("stream_sorter");
        let sortedAlphabetically = temp2.value;
        if (sortedAlphabetically == "alpha_down") {
            data.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                } else if (a.title > b.title) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else if (sortedAlphabetically == "alpha_up") {
            data.sort((a, b) => {
                if (a.title > b.title) {
                    return -1;
                } else if (a.title < b.title) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
        let temp = document.getElementById("stream_type");
        let mediaType = temp.value;
        if (mediaType == "both") {
            displayTitles(data, ["Movie", "TV Show"], ratings);
        } else if (mediaType == "movie") {
            displayTitles(data, ["Movie"], ratings);
        } else if (mediaType == "show") {
            displayTitles(data, ["TV Show"], ratings);
            
        }
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getNetflixMovieData() {
    try {
        let response = await fetch(url + '/api/netflix/all', {
            method: 'GET',
        });
        var data = await response.json();
        console.log(data);
        displayTitles(data, ["Movie"]);
    } catch (error) {
        console.error(error);
    }
}


async function getNetflixShowData() {
    try {
        let response = await fetch(url + '/api/netflix/all', {
            method: 'GET',
        });
        var data = await response.json();
        console.log(data);
        displayTitles(data, ["TV Show"]);
    } catch (error) {
        console.error(error);
    }
}

// function to filter between movie and show
async function getMediaType() {
    const typeOfMedia = document.getElementById("stream_type").value;
    try {
        const response = await fetch(url + '/api/all', {
            method: 'GET',
        });
        body: JSON.stringify({ mediaType: typeOfMedia })
        const data = await response.json();
        console.log(data);

        var table = document.getElementById("media_display_table");
        for (const item of data) {
            var row = table.insertRow()
            var titleCell = row.insertCell(0);
            var typeCell = row.insertCell(1);
            var ratingCell = row.insertCell(2);
            var durationCell = row.insertCell(3);
            //var listedInCell = row.insertCell(4);
            
            titleCell.innerHTML = item.title;
            typeCell.innerHTML = item.type;
            ratingCell.innerHTML = item.rating;
            durationCell.innerHTML = item.duration;
            //listedIn.innerHTML = item.listed_in;
        }
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

// function to ping the server 
async function ping() {
    const res = await fetch(url + "/ping")
}

setInterval(ping, 120000); // Will call it every 2 minutes to keep the server awake while the client uses it