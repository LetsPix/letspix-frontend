// where it is posting the data
const url = 'http://localhost:3000/create';
const getDate = new Date();

// schema WILL COME BACK TO THIS - BF
/*const newMedia = {
    type: ,
    title: ,
    director: ,
    country: ,
    date_added: getDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}), // this will just get the current tim
    release_year: ,
    rating: ,
    duration: ,
    listed_in: ,
    description: ,
    service: 
};
*/
async function createMedia(url, newMedia) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMedia)
        });
        const newMediaData = await response.json();
        console.log(newMediaData);
    } catch (error) {
        console.error(error);
    }
}
createMedia(url, newMedia);
  