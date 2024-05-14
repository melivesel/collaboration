
async function search() {
  const input = document.getElementById('searchInput').value;
  const apiKey = 'Y5036dfe4a87b973cb6bc2c1e2bfc70ef'; // Replace with your API key
  const apiUrl = `https://gateway.marvel.com:443/v1/public/comics?format=comic&formatType=comic&noVariants=false&dateRange=1000-01-01%2C2024-05-13&orderBy=onsaleDate&limit=3&apikey=5036dfe4a87b973cb6bc2c1e2bfc70ef
  `;
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Network response was not ok');
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

function extractDocuments(data) {
// Implement this function to extract relevant documents from the Marvel API response
// For example, you might extract comic titles or descriptions
return data.results.map(comic => comic.title);
}

const formSubmitHandler = function (event) {
  event.preventDefault();

  const username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    repoContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a GitHub username');
  }
};

const buttonClickHandler = function (event) {
  // What is `event.target` referencing?
  // TODO: Write your answer here
  // the fuctiontion is referencing the object clicked on event, and .target is indicating that that is the attribute thats chosen

  const language = event.target.getAttribute('data-language');

  // Why is this `if` block in place?
  // TODO: Write your answer here
  // if a language is chosen, fill the repo container with the featured repos
  if (language) {
    getFeaturedRepos(language);

    repoContainerEl.textContent = '';
  }
};

const getUserRepos = function (user) {
  const apiUrl = `https://www.loc.gov/rr/?fo=json`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos(data, user);
        });
      } else {
        alert(`Error:${response.statusText}`);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};

const getFeaturedRepos = function (language) {
  // What are the query parameters doing here?
  // TODO: Write your answer here
  // query parameters for given lanuage is featured repos containing help wanted issues 
  const apiUrl = `https://www.loc.gov/rr/?fo=json`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert(`Error:${response.statusText}`);
    }
  });
};

const displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = 'No repositories found.';
    // What would happen if there was no `return;` here?
    // TODO: Write your answer here
    //the function would stop and not prompt again
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  for (let repoObj of repos) {
    // What is the result of this string concatenation?
    // TODO: Write your answer here
    // repo name will be the repoobs owners login / the name of hte repo obj
    const repoName = `${repoObj.owner.login}/${repoObj.name}`;

    const repoEl = document.createElement('div');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';

    const titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    const statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repoObj.open_issues_count > 0) {
      statusEl.innerHTML =
        `<i class='fas fa-times status-icon icon-danger'></i>${repoObj.open_issues_count} issue(s)`;
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
languageButtonsEl.addEventListener('click', buttonClickHandler);
