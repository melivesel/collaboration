const appendImageUrlToDiv = function(character) {
    fetch('/assets/js/vendorapis.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const apiKey = data.giphy.apiKey;
            const apiUrlGif = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${character}&channel=@marvel&limit=25&offset=0&rating=g&lang=en`;
            
            fetch(apiUrlGif, { cache: 'reload' })
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log(data);
                    const randomNumber = Math.floor(Math.random() * data.data.length);
                    const gifId = data.data[randomNumber].id;
                    const embedUrl = `https://giphy.com/embed/${gifId}`;
                    
                    // Set the Giphy embed URL to the iframe
                    const iframeElement = document.createElement('iframe');
                    iframeElement.src = embedUrl;
                    iframeElement.width = '480';
                    iframeElement.height = '270';
                    iframeElement.frameBorder = '0';
                    iframeElement.className = 'giphy-embed';
                    iframeElement.allowFullscreen = true;
                    
                    // Append the iframe to the div with id "searchresult"
                    const searchResultDiv = document.getElementById('searchresult');
                    searchResultDiv.innerHTML = ''; // Clear existing content
                    searchResultDiv.appendChild(iframeElement);
                    
                    document.cookie = "cookieName=cookieValue; Secure";
                    
                    return embedUrl;
                });
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
        });
}
// Call the function with the desired character
appendImageUrlToDiv('ironman');

// Generate a timestamp in milliseconds
const timestamp = new Date().getTime();

// Construct the API URL with the timestamp parameter
const baseUrl = 'https://gateway.marvel.com/v1/public/';

function getMarvel(url) {
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
};
function getServices() {
    fetch("./assests/js/vendorapis.json")
        .then(function (data) {
            const publicKey = data.marvel.publicKey;
            const privateKey = data.marvel.privateKey;
            const timestamp = new Date().getTime();
            const url = `${baseUrl}characters?apikey=${publicKey}&ts=${timestamp}&hash=${MD5(timestamp + privateKey + publicKey)}`;
//http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150
getMarvel(url);
        });

}

