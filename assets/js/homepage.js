const searchInputEl = document.querySelector('#searchInput');
const displayReposEL = document.querySelector('#displayRepos')

async function search() {
  const input = document.getElementById('searchInput').value;
  const apiKey = `Y5036dfe4a87b973cb6bc2c1e2bfc70ef`; // Replace with your API key
  const apiUrl = `https://gateway.marvel.com:443/v1/public/comics?format=comic&formatType=comic&noVariants=false&dateRange=1000-01-01%2C2024-05-13&orderBy=onsaleDate&limit=3&apikey=5036dfe4a87b973cb6bc2c1e2bfc70ef
  `;
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      if (response.status === 404) {
        // Display error modal for 404 error
        const errorModal = document.getElementById('errorModal');
        errorModal.classList.add('is-active');
      } else {
        alert('Network response was not ok');
      }
      return; // Exit the function early
    }
    const data = await response.json();
    const documents = extractDocuments(data); // Implement this function to extract relevant documents from Marvel API response
    const requestBody = {
        documents: documents,
        query: input
    };

    // Now you can perform your search using the OpenAI API with the requestBody
    console.log('Search request body:', requestBody);
} catch (error) {
    console.error('Error:', error);
}
}

function extractDocuments(data){
// Implement this function to extract relevant documents from the Marvel API response
// For example, you might extract comic titles or descriptions
return data.results.map(comic => comic.title);
}
  fetch('apiUrl').then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert(`Error:${response.statusText}`);
    }
  });

searchInputEl.addEventListener('submit',search);
const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', search);
