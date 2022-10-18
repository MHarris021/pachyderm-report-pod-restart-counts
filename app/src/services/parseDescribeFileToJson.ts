import {readFile} from "fs/promises";
import {podFields} from "../constants/podFields";
import {processField} from "./processField";

export async function parseDescribeFileToJson(filePath: string): Promise<any> {
    let json = {};
    const fileContents = await readFile(filePath, 'utf8');
    const lines = fileContents.split(/\r?\n/);
    let currentLine = 0;
    while (currentLine < lines.length) {
        const startingLine = currentLine;
        podFields.forEach((field) => {
            const {newObj, endLine} = processField(lines[currentLine], field, json, currentLine, lines);
            json = newObj;
            currentLine = endLine;
        });
        if (startingLine === currentLine) {
            currentLine++;
        }
    }
    console.log(`Final json: ${JSON.stringify(json)}`);
    return json;
}