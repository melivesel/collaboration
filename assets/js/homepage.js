const searchForm = document.getElementById('searchForm');
const searchInputEl = document.getElementById('searchInput');
const errorModal = document.getElementById("errorModal");
const span = document.getElementsByClassName("close")[0];

const calculateMD5 = function calculateMD5(str) {
    return CryptoJS.MD5(str).toString();
}

searchForm.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(event) {
    event.preventDefault();

    const characterId = searchInputEl.value.trim(""); // Get character ID from input field

    const publicKey = "5036dfe4a87b973cb6bc2c1e2bfc70ef";
    const privateKey = "84a5e37ccf26936499065124f5949d257ff53c89";
    const ts = Math.floor(Date.now() / 1000);
    const concatenatedString = `${ts}${privateKey}${publicKey}`;
    console.log("Concatenated String:", concatenatedString);

    const md5Hash = calculateMD5(concatenatedString);
    const auth = `ts=${ts}&apikey=${publicKey}&hash=${md5Hash}`;

    const apiUrl = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?format=comic&formatType=comic&noVariants=false&hasDigitalIssue=true&orderBy=title&limit=10${auth}`;
    console.log(apiUrl);

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    errorModal.classList.add('is-active');
                } else {
                    alert('Network response was not ok');
                }
            }
            return response.json();
        })
        .then(data => {
            const documents = extractDocuments(data);
            const requestBody = {
                documents: documents,
                query: characterId
            };
            console.log(data);
            console.log('Search request body:', requestBody);
            displayFetchedData(data);
        });
}

function extractDocuments(data) {
    return data.results;
}

function displayFetchedData(data) {
    // Implement this function to display the fetched data
}

span.addEventListener('click', function() {
    errorModal.classList.remove('is-active');
});