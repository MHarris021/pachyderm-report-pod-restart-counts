import {searchFile} from "./searchFile";

export type getPropertyOptions = {
    startLine?: number;
    endLine?: number;
    separator: string|RegExp;
}

export async function getProperty(filePath: string, property: string, options:getPropertyOptions={startLine:0,endLine:-1,separator:": "}): Promise<string> {
    console.log(`Searching for ${property} in ${filePath}`);
    const result = await searchFile(filePath, property, {startLine: options.startLine, endLine: options.endLine});
    if (result.match) {
        const value = result.line.split(options.separator)[1];
        console.log(`Property ${property}: ${value}`);
        return value.trim();
    }
    console.log(`Property ${property} not found`);
    return '';
}