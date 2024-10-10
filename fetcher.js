/*
Implement a node app called fetcher.js.

It should take two command line arguments:

a URL
a local file path
It should download the resource at the URL to the local path on your machine.
Upon completion, it should print
out a message like Downloaded and saved 1235 bytes to ./index.html.

ex: node fetcher.js http://www.example.edu/ ./index.html

use needle to fetch the data
use fs to write the file
use callbacks to orchestrate the process
DON'T use pipe function or sync functions
 */

const needle = require('needle');
const fs = require('fs');
const path = require('path');

// ex: node fetcher.js http://www.example.edu/ ./index.html
const url = process.argv[2];
const filePath = process.argv[3];


// Check if the file already exists
if (fs.existsSync(filePath)) {
  console.error(`Error: The file at ${filePath} already exists.`);
  process.exit(1);
}
// check if the file path is valid
const dir = path.dirname(filePath);
if (!fs.existsSync(dir)) {
  console.error(`Error: The directory ${dir} does not exist.`);
  process.exit(1);
}

needle.get(url, (error, response, body) => {
    if (error) {
      console.error(error);
      return error;
    }
    if (response.statusCode !== 200) {
      console.error(`Error: Received status code ${response.statusCode}`);
      return;
    }
    
    fs.writeFile(filePath, body, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
      console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
    });
  }
);

/*
EDGE CASES

the local file already exists?
the local file path given is invalid?
the URL results in an error or non-200 result?
 */



