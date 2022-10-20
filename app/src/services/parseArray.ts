import startsWith from "lodash.startswith";
import {parseValue} from "./parseValue";
import isEmpty from "lodash.isempty";

export type ParseArrayParams = {
    lines: string[];
    currentLine: number;
    position?: number;
}

export function parseArray(params:ParseArrayParams): {array: string[], endLine: number} {
    const {lines, currentLine, position} = params;
    let array: string[] =[];
    let currentLine1 = currentLine;
    let currentPosition = position || 1;
    console.info(`Parsing array: ${lines[currentLine1]}`);
    const {value} = parseValue(lines[currentLine1]);
    if(!isEmpty(value)) {
        array.push(value);
    }
    currentLine1++;
    while (startsWith(lines[currentLine1], " ", currentPosition)) {
        console.info(`Parsing array line: ${lines[currentLine1]}`);
        array.push(lines[currentLine1].trim());
        currentLine1++;
    }
    array = array.filter((item) => item !== "");
    console.info(`Values: ${array}`);
    return {array, endLine: currentLine1};
}