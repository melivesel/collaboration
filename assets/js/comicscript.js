fetch("https://gateway.marvel.com:443/v1/public/characters?name=Iron%20Man&apikey=f99ff0ebd9b29727ddc4d22f632170a4")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const characterId = data.data.results[0].id;

        fetch(`https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?limit=5&apikey=f99ff0ebd9b29727ddc4d22f632170a4`)
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