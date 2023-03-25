// where it is posting the data
const url = 'http://localhost:3000/create';
const getDate = new Date();

// schema
const newMedia = {
    type: 'Show',
    title: 'Brian Feddes',
    director: 'Brian',
    country: 'United States',
    date_added: getDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}), // this will just get the current tim
    release_year: '2023',
    rating: 'R',
    duration: '60 seconds',
    listed_in: 'Comedy',
    description: 'Brian\'s life'
};
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