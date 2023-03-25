const url = 'http://localhost:3000/all/Netflix';

async function getData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

getData(url);

