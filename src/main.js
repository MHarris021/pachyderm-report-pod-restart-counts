const fs = require('fs/promises');
const path = require('path');

async function main() {
  try {
    const args = process.argv.slice(2);
    const inputDir = path.resolve(args[0]);
    const outputDir = path.resolve(args[1]);
    for (const file of await fs.readdir(inputDir)) {

/************* YOUR CODE HERE *************

 This is where the useful code would go
 Each file in the input directory would be processed
 and the result could be written to the output directory

 */

    }
  } catch (err) {
      console.log(err); // eslint-disable-line no-console
  }
}

// Run the main function
main();
