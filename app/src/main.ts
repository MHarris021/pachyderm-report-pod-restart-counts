import camelCase from "lodash.camelcase";
import {SearchResult} from "./models/SearchResult";
import {searchFile} from "./services/searchFile";
import {analyzePodInfo} from "./services/analyzePodInfo";
import {analyzePodConditions} from "./services/analyzePodConditions";

const {promises: fsPromises} = require('fs');
const path = require('path');
const readline = require('readline');
const stream = require('stream');



function objectFromText(text: string): object {
  const fields = text.split(':');
  const key = camelCase(fields[0].trim());
  const value = fields.slice(1).join().trim();
  return {[key]: value};
}

async function analyzeFile(filePath: string): Promise<{output: string, fileName: string}> {
  let output = "{\n\"podAnalysis\": [\n";
  const podName = await searchFile(filePath, 'Name: ');
  output+=JSON.stringify(objectFromText(podName.line))+",\n";
  const restartCount = await searchFile(filePath, 'Restart Count: ');
  output+=JSON.stringify(objectFromText(restartCount.line))+",\n";
  const podState = await searchFile(filePath, 'State: ');
  output+=JSON.stringify(objectFromText(podState.line))+",\n";
  if (podState.line.includes('Running')) {
    const podStarted = await searchFile(filePath, 'Started: ', {startLine: podState.lineNumber});
    output+=JSON.stringify(objectFromText(podStarted.line))+",\n";
  }
  const podLastState = await searchFile(filePath, 'Last State: ');
  if(podLastState.match && podLastState.line.includes('Terminated')) {
    output+=JSON.stringify(objectFromText(podLastState.line))+",\n";
    const podTerminatedReason = await searchFile(filePath, 'Reason: ', {startLine: podLastState.lineNumber});
    output+=JSON.stringify(objectFromText(podTerminatedReason.line))+",\n";
    const podTerminatedExitCode = await searchFile(filePath, 'Exit Code: ', {startLine: podLastState.lineNumber});
    output+=JSON.stringify(objectFromText(podTerminatedExitCode.line))+",\n";
    const podLastStarted = await searchFile(filePath, 'Started: ', {startLine: podLastState.lineNumber});
    output+=JSON.stringify(objectFromText(podLastStarted.line))+",\n";
    const podLastFinished = await searchFile(filePath, 'Finished: ', {startLine: podLastState.lineNumber});
    output+=JSON.stringify(objectFromText(podLastFinished.line));
  }
  output = output.replace(/,\s*$/, "");
  output+="\n]\n}";
  return {output:output, fileName: podName.line.split(':')[1].trim()};
}



async function main() {
  try {
    const args = process.argv.slice(2);
    const inputDir = path.resolve(args[0]);
    const outputDir = path.resolve(args[1]);
    for (const file of await fsPromises.readdir(inputDir)) {
      const filePath = path.join(inputDir, file);
      if ((await fsPromises.stat(filePath)).isFile()) {
        //const {output, fileName} = await analyzeFile(filePath);
        const podInfo=await analyzePodInfo(filePath);
        const outputFile = path.join(outputDir, podInfo.podName+'.json');
        console.log(`Writing ${outputFile}`); // eslint-disable-line no-console
        console.log(podInfo.toJsonObject()); // eslint-disable-line no-console
        let output = `{\"podInfo\":${podInfo.toString()},`;
        const podConditions = await analyzePodConditions(filePath);
        console.log(podConditions.toJsonObject()); // eslint-disable-line no-console
        output+=`\"podConditions\":${podConditions.toString()}}`;

        await fsPromises.writeFile(outputFile, output);
      }
    }
  } catch (err) {
      console.log(err); // eslint-disable-line no-console
  }
}

// Run the main function
main();
