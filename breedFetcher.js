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


