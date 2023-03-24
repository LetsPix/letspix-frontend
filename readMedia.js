const url = 'http://localhost:3000/all';

fetch(url, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
