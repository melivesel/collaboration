function getRequestedData(request)
{
    /**
     * means the same: fetch(request).then( function(response) { return response.json()} );
     */
    return fetch(request).then(response => response.json());
};

function getDomain() 
{
    return 'https://gateway.marvel.com/v1/public/';
}

function getEndpoint(path)
{
    const baseUrl = getDomain();
    fetch("./assets/js/vendorapis.json")
        .then(function (data) {
            const publicKey = data.marvel.publicKey;
            const privateKey = data.marvel.privateKey;
            const timestamp = new Date().getTime();
            const url = `${baseUrl}${path}?apikey=${publicKey}&ts=${timestamp}&hash=${MD5(timestamp + privateKey + publicKey)}`;
            getRequestedData(url);
    });
}

function test()
{
    let results = {};
    //first test, console.log data for all characters:
    getEndpoint('characters')
    .then(data => {
        results = data;
        console.log(results);
    });
}