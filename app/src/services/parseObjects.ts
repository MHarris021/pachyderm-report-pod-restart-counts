import {DescribeField} from "../constants/types";
import invariant from "tiny-invariant";
import startsWith from "lodash.startswith";
import {parseObject} from "./parseObject";


export type ParseObjectsParams = {
    lines: string[];
    field: DescribeField;
    currentLine: number;
    position?: number;
}

export type ParseObjectsResult = {
    objectArray: object[];
    objectArrayKey: string;
    endLine: number;
}

export function parseObjects(params: ParseObjectsParams): ParseObjectsResult {
    const {lines, field, currentLine, position} = params;
    invariant(field.fieldType === 'objectArray', 'Field type must be objectArray');
    invariant(field.subFields, 'Subfields are required for objectArray');
    let objectArray: object[] = [];
    const objectArrayKey = field.name;
    let currentLine1 = currentLine+1;
    let currentPosition = position || 1;
    const subFields = field.subFields;
    while ((currentLine1 < lines.length) && startsWith(lines[currentLine1], " ", position)) {
        const startLine = currentLine1;
        console.info(`Parsing object ${field.name} at line ${currentLine1} with value ${lines[currentLine1]}`);
        const startLine1 = currentLine1;
        const objectName = lines[currentLine1].split(":")[0].trim();
        const {obj, endLine} = parseObject({lines, fields: subFields, currentLine: currentLine1, objectName,position: currentPosition + 2});
        currentLine1 = endLine;
        objectArray.push(obj);
        console.info(`Parsed object ${field.name} from line ${startLine} to line ${currentLine1}`);
        if (startLine1 === currentLine1) {
            break;
        }
    }
    return {objectArray,objectArrayKey, endLine: currentLine1};
}