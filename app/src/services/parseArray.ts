import startsWith from "lodash.startswith";

export function parseArray(lines:string[], currentLine:number, position:number=1): {array: string[], endLine: number} {
    let array: string[] =[];
    let currentLine1 = currentLine;
    const initialValue = lines[currentLine].split(": ")[1]?.trim()||"";
    if (initialValue) {
        array.push(initialValue);
        currentLine1++;
    }
    while (startsWith(lines[currentLine1], " ", position)) {
        console.info(`Parsing array line: ${lines[currentLine1]}`);
        array.push(lines[currentLine1].trim());
        currentLine1++;
    }
    array = array.filter((item) => item !== "");
    console.log(`Values: ${array}`);
    return {array, endLine: currentLine1};
}