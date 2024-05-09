const characterChoice = document.querySelector('#searchresult');

function getRandomNumber() {
    // Generate a random decimal number between 0 (inclusive) and 1 (exclusive)
    const randomNumber = Math.random();
    
    // Scale the random number to be between 1 and 25
    const scaledNumber = Math.floor(randomNumber * 25);
    
    return scaledNumber;
}

function generateTimestamp() {
    const currentDateTime = new Date();
    const timestamp = currentDateTime.toISOString();
    return timestamp;
    
}

const randomNumber = getRandomNumber();
console.log(randomNumber);

const timestamp = generateTimestamp(); // Generate a timestamp using the function we discussed earlier
const apiUrlGif = 'https://api.giphy.com/v1/gifs/search?api_key=IeRo8C6Ohj2ZFVaLuyBHDqJ5VMCSxDiv&q=ironman&channel=@marvel&limit=25&offset=0&rating=g&lang=en&';
const apiUrlComics = `https://gateway.marvel.com:443/v1/public/comics?characters=spider%20man&apikey=f99ff0ebd9b29727ddc4d22f632170a4&`;


fetch(apiUrlGif, {
    cache: 'reload'
})
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    const imageUrl = data.data[randomNumber].embed_url;
    console.log(imageUrl);

    // Set the cookie after fetching the data
    document.cookie = "cookieName=cookieValue; Secure";
    
    return imageUrl;
});
fetch(apiUrlComics, {
    cache: 'reload'
})
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    

    // Set the cookie after fetching the data
    document.cookie = "cookieName=cookieValue; Secure";
    
});

