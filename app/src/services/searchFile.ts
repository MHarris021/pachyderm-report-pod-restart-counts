import {SearchResult} from "../models";
import {createReadStream} from "fs";
import stream from "stream";
import readline from "readline";
import invariant from "tiny-invariant";

export type SearchFileOptions = {
    startLine?: number;
    endLine?: number;
}

export async function searchFile(filePath:string, searchTerm:string, options:SearchFileOptions = {startLine: 0, endLine: -1}): Promise<SearchResult> {
    const inputStream = await createReadStream(filePath);
    const outputStream = new stream.Writable();
    const rl = readline.createInterface(inputStream, outputStream);
    invariant(options.startLine !== undefined, "startLine must be defined");
    let lineNum = 0;
    for await (const line of rl) {
        lineNum++;
        if (lineNum > options.startLine) {
            if (line.includes(searchTerm)) {
                console.log(`${filePath}:${lineNum}: ${line}`); // eslint-disable-line no-console
                return new SearchResult(line.trim(), lineNum, true);
            }
        }
    }
    return new SearchResult('', lineNum, false);
}