const searchResultDiv = document.getElementById('comicSuggestion');

document.addEventListener('DOMContentLoaded', function() {
    const searchNameElement = document.getElementById('searchName');
    const characterName = searchNameElement.textContent.trim()
    console.log('Character Name:', characterName);

    const appendComicsToDiv = function(character) {
        fetch(`https://gateway.marvel.com:443/v1/public/characters?name=${character}&apikey=f99ff0ebd9b29727ddc4d22f632170a4`)
            .then(function(response) {
                if (!response.ok) {
                    if (response.status === 404) {
                        errorModal.classList.add('is-active');
                    } else {
                        alert('Network response was not ok');
                    }
                }
                return response.json();
            })
            .then(function(data) {
                const characterId = data.data.results[0]?.id; // Using optional chaining to handle undefined characterId
                console.log(data);
                console.log(characterId);
                
                if (!characterId) {
                    const errorMessage = document.createElement('p');
                    errorMessage.textContent = "No Character ID found, check spelling and spacing!";
                    searchResultDiv.appendChild(errorMessage);
                } else {
                    fetch(`https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?limit=5&apikey=f99ff0ebd9b29727ddc4d22f632170a4`)
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(data) {
                            const comics = data.data.results;
                            searchResultDiv.innerHTML = '';
                            searchResultDiv.style.fontFamily = 'IBM Plex Sans, sans-serif';
                            console.log(data);

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
                }
            })
            .catch(function(error) {
                console.log("Error fetching data:", error);
            });
    };

    appendComicsToDiv(characterName);
});