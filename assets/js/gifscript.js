const appendImageUrlToDiv = function(character) {
    const apiKey = 'IeRo8C6Ohj2ZFVaLuyBHDqJ5VMCSxDiv';
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

            return embedUrl;
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
        });
};

// Call the function with the desired character
appendImageUrlToDiv('ironman');