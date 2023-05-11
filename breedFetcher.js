const request = require('request');

const breedFetcher = function(breedName) {
  return new Promise((resolve, reject) => {
    const link = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

    request(link, (error, response, body) => {
      if (error) {
        reject(error);
        return;
      }

      //Let's use JSON.parse to convert the JSON string into an actual object.
      const data = JSON.parse(body);
      if (data.length === 0) {
        reject(`Breed '${breedName}' not found.`);
        return;
      }

      //Access the first entry in the data array and print out the description for the user.
      const breed = data[0];
      const description = breed.description;
      resolve(description);
    });
  });
};

//Allow the user to specify the breed name using command-line arguments.
const breedName = process.argv[2];

if (!breedName) {
  console.log('Please provide a breed name as an argument.');
  process.exit(1);
}

//Handle request errors and print the error details to the screen.
breedFetcher(breedName)
  .then(description => {
    console.log('Description:', description);
  })
  .catch(error => {
    console.log('Error:', error);
  });


module.exports = {breedFetcher};
