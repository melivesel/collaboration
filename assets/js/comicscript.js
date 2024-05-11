const appendComicUrlToDiv = function(character) {
    fetch('./vendorapis.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const apiPublicKey = data.marvel.publicKey;
            const apiPrivateKey = data.marvel.privateKey;
            const apiUrlComic = `https://gateway.marvel.com:443/v1/public/characters?name=${character}&apikey=${apiPublicKey}`;
            fetch(apiUrlComic)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    const characterId = data.data.results[0].id;
                    fetch(`https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?limit=5&apikey=${apiPublicKey}`)
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(data) {
                            const comics = data.data.results;
                            const searchResultDiv = document.getElementById('comicsuggestion');
                            searchResultDiv.innerHTML = '';
                            searchResultDiv.style.fontFamily = 'IBM Plex Sans, sans-serif';
                            comics.forEach(function(comic) {
                                const comicTitle = comic.title;
                                const comicTitleElement = document.createElement('h2');
                                const comicDescription = comic.description;
                                const comicDescriptionElement = document.createElement('p');
                                comicTitleElement.textContent = comicTitle;
                                searchResultDiv.appendChild(comicTitleElement);

                                if (comicDescription) {
                                    comicDescriptionElement.textContent = comicDescription;
                                } else {
                                    comicDescriptionElement.textContent = "No description available";
                                }

                                searchResultDiv.appendChild(comicDescriptionElement);
                            });
                        })
                        .catch(function(error) {
                            console.log("Error fetching data:", error);
                        });
                })
                .catch(function(error) {
                    console.log("Error fetching data:", error);
                });
        })
        .catch(function(error) {
            console.log("Error fetching data:", error);
        });
}
appendComicUrlToDiv("iron man")