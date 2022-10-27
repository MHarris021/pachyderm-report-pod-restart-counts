import camelCase from "lodash.camelcase";
import { parseDescribePodFile } from "./services/parseDescribePodFile";

const { promises: fsPromises } = require("fs");
const path = require("path");
async function main() {
  try {
    const args = process.argv.slice(2);
    const inputDir = path.resolve(args[0]);
    const outputDir = path.resolve(args[1]);
    for (const file of await fsPromises.readdir(inputDir)) {
      const filePath = path.join(inputDir, file);
      if ((await fsPromises.stat(filePath)).isFile()) {
        //const {output, fileName} = await analyzeFile(filePath);
        const output = await parseDescribePodFile(filePath);
        const fileName = output.name;
        const outputFilePath = path.join(outputDir, fileName + ".json");
        await fsPromises.writeFile(
          outputFilePath,
          JSON.stringify(output, null, 2)
        );
      }
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
}

// Run the main function
main();
