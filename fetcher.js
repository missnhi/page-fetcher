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

// ex: node fetcher.js http://www.example.edu/ ./index.html
const url = process.argv[2];
const filePath = process.argv[3];

needle.get(url, (error, response, body) => {
    if (error) {
      console.error(error);
      return error;
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