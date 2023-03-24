// where it is posting the data
const url = 'http://localhost:3000/create';

// schema
const newMedia = {
  type: 'Show',
  title: 'Brian Feddes',
  director: 'Brian',
  country: 'United States',
  date_added: '2023-03-23T00:00:00.000Z',
  release_year: '2023',
  rating: 'R',
  duration: '60 seconds',
  listed_in: 'Comedy',
  description: 'Brian\'s life'
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newMedia)
})
.then(response => response.json())
.then(newMedia => console.log(newMedia))
.catch(error => console.error(error));
