import {DescribeField} from "../constants/types";
import invariant from "tiny-invariant";
import startsWith from "lodash.startswith";
import {processField} from "./processField";

export function parseObjects(lines: string[], field: DescribeField, currentLine: number, position: number = 0): { objects: object[], endLine: number } {
    let objects: object[] = [];
    let currentLine1 = currentLine;
    const initialValue = lines[currentLine].split(": ")[1]?.trim()||"";
    if (initialValue) {
        objects.push({[field.name]: initialValue});
        currentLine1++;
    }
    invariant(field.subFields, "Subfields are required for object");
    const subFields = field.subFields;
    while (currentLine1 < lines.length && startsWith(lines[currentLine1], " ", position)) {
        const startLine = currentLine1;
        let obj: object = {
            name: lines[currentLine1].trim(),
        };
        currentLine1++;
        console.info(`Parsing object ${field.name} at line ${currentLine1} with value ${lines[currentLine1]}`);
        while (currentLine1 < lines.length && startsWith(lines[currentLine1], " ", position + 2)) {
            const startLine1 = currentLine1;
            const line = lines[currentLine1].trim();
            console.log(`Parsing object line: ${line}`);
            subFields.forEach(subField => {
                const {newObj, endLine} = processField(line, subField, obj, currentLine1, lines, position);
                obj = newObj;
                currentLine1 = endLine;
            });
            if (startLine1 === currentLine1) {
                currentLine1++;
            }
        }
        objects.push({...obj});
        if (startLine === currentLine1) {
            currentLine1++;
        }
    }
    return {objects, endLine: currentLine1};
}