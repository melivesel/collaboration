const searchParams = new URLSearchParams(window.location.search);
const searchQuery = searchParams.get('search');

if (searchQuery) {
    const nameDiv = document.querySelector('#searchName');
    nameDiv.textContent = searchQuery;
    console.log(searchQuery);
}

console.log('Script executed');
const msgDiv = document.querySelector('#msg');

function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute('class', type);
}

document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.querySelector('#search');
    const saveButton = document.querySelector('#save');


    saveButton.addEventListener('click', function(event) {
        event.preventDefault();

        const name = nameInput.value.trim();

        if (name === '') {
            displayMessage('error', 'Search bar cannot be blank');
        } else {
            const marvelDisplay = `results.html?search=${name}`;
            window.location.href = marvelDisplay;
        }
    });
});