
/**
 * Link to actual server
 * https://letspix.azurewebsites.net/
 * Link to client
 * https://polite-plant-0fd6d3810.2.azurestaticapps.net
 * Link to localhost for testing 
 * http://localhost:3000
 */

const url = 'https://letspix.azurewebsites.net/';
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
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    try {
        let temp = document.getElementById("stream_type");
        let mediaType = temp.value;
        
        if (mediaType == "both"){
            getNetflixMediaData();
        } else if (mediaType == "film") {
            getNetflixMovieData();
        } else {
            getNetflixShowData();
        }
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

async function displayTitles(data, mediaType) {
    try {
        var table = document.getElementById("media_display_table");
        for (const item of data) {
            if (mediaType.includes(item.type)) {
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
        }
    } catch(error) {
        console.error(error);
    }
}

// function to read the data from the /api/netflix/all endpoint - JB
// Thank you w3schools for the table methods info!
async function getNetflixMediaData() {
    try {
        let response = await fetch(url + '/api/netflix/all', {
            method: 'GET',
        });
        var data = await response.json();
        console.log(data);
        displayTitles(data, ["TV Show", "Movie"]);
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

// *************************************
// login in and authenitcation functions
// *************************************

// register function
// function register() {
//     console.log('REGISTER INITIATED')
//     // retrieve registration info
//     email = document.getElementById('email_signup').value
//     password = document.getElementById('password_signup').value
//     //passwordConfirmation = document.getElementById('password_signup_confirmation').value
//     username = document.getElementById('username_signup').value
//     securityQuestion = document.getElementById('security_question_signup').value
//     // validate inputs
//     if (validateEmail(email) == false){
//         alert('No Valid Email Found')
//         return
//     }
//     if (validatePassword(password) == false){
//         alert('Password Does Not Meet Requirements')
//         return
//     }
//     if (validateField(username)==false){
//         alert('Username Required')
//         return
//     }
//     if (validateField(securityQuestion)==false){
//         alert('Security Question Required')
//         return
//     }
//     // Authentication
//     auth.createUserWithEmailAndPassword(email,password)
//     .then(function(){
//     // user object
//     var user = auth.currentUser
    

//     // firebase database
//     var databaseRef = database.ref()

//     // create user
//     var userData = {
//         email: email,
//         username : username,
//         securityQuestion : securityQuestion,
//         last_login : Date.now(),
//         watched : null
//     }
//     databaseRef.child('users/'+user.uid).set(userData)
//     })
//     .catch(function(error){
//         // firebase errors
//         var errorCode = error.error_code
//         var errorMessage = error.message
//         alert(errorMessage)
//     })

//     alert('User Created')
//     window.location.href = "account.html";
// }



function validateEmail(email){
    expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (expression.test(email)==true){
        return true
    } else {
        return false
    }
}

function validatePassword(password){
    if (password < 6){
        return false
    } else {
        return true
    }
}

function validatePasswordConfirmation(password,passwordConfirmation){
    if (password.localeCompare(passwordConfirmation)==0){
        return true
    } else {
        return false
    }
}

function validateField(field){
    if (field == null){
        return false
    }
    if (field.length <= 0){
        return false
    } else {
        return true
    }
}

// function to refresh page 
function refreshPage() {
    window.location.reload();
}

// function to ping the server 
async function pingServer() {
    try {
        const response = await fetch(url + '/ping', {
            method: 'GET',
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
/*
$('#recipeCarousel').carousel({
    interval: 10000
  })
  
  $('.carousel .carousel-item').each(function(){
      var minPerSlide = 3;
      var next = $(this).next();
      if (!next.length) {
      next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
      
      for (var i=0;i<minPerSlide;i++) {
          next=next.next();
          if (!next.length) {
              next = $(this).siblings(':first');
            }
          
          next.children(':first-child').clone().appendTo($(this));
        }
  });
*/
setInterval(pingServer, 120000); // Will call it every 2 minutes to keep the server awake while the client uses it