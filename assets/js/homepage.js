const searchForm = document.getElementById('searchForm');
    const searchInputEl = document.getElementById('searchInput');
    const errorModal = document.getElementById("errorModal");
    const span = document.getElementsByClassName("close")[0];

    searchForm.addEventListener('submit', formSubmitHandler);

    function formSubmitHandler(event) {
        event.preventDefault(); // Prevent default form submission behavior

        const characterId = searchInputEl.value.trim();
        const apiKey = 'f99ff0ebd9b29727ddc4d22f632170a4'; // Replace with your API key
        const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?orderBy=name&apikey=${apiKey}`;

   
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        errorModal.classList.add('is-active');
                    } else {
                        alert('Network response was not ok');
                    }
                    throw new Error('Network response was not ok');
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

                const jsonData = JSON.stringify(data);
                localStorage.setItem('apiData', jsonData);
                console.log('Data stored in localStorage');
            }).catch(error => {
                console.error('Failed to fetch and store data:', error);
            })
              
    function extractDocuments(data) {
        return data.results;
    }

    function displayFetchedData(data) {
        // Implement this function to display the fetched data
    }}

    span.addEventListener('click', function() {
        errorModal.classList.remove('is-active');
    });

    function getData() {
        const storedData = localStorage.getItem('apiData');

        if (storedData) {
            const data = JSON.parse(storedData);
            return data;
        } else {
            console.log('No data found in localStorage');
            return null;
        }
    }

const storedData = getData();
console.log('Retrieved data:', storedData)

