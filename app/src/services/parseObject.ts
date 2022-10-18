import {parseValue} from "./parseValue";
import startsWith from "lodash.startswith";
import {updateObject} from "./updateObject";
import {DescribeFields, DescribeFieldType} from "../constants/types";
import {parseArray} from "./parseArray";

export function parseObject(lines: string[], currentLine: number, fields: DescribeFields,position:number=1): {obj: object, endLine: number} {
    let obj: object = {};
    const {key, value} = parseValue(lines[currentLine]);
    const objectName = key;
    let currentLine1 = currentLine+1;
    while (startsWith(lines[currentLine1], " ", position)) {
        const startLine = currentLine1;
        const line = lines[currentLine1];
        console.info(`Parsing object line: ${line}`);
        fields.forEach(field => {
            if(startsWith(line, field.field, position+1)) {
                switch (field.fieldType) {
                    case DescribeFieldType.Value: {
                        console.info(`Parsing value field: ${field.field}`);
                        const {key, value} = parseValue(line);
                        obj = updateObject(obj, key, value);
                        currentLine1++;
                        break;
                    }
                    case DescribeFieldType.Array: {
                        console.info(`Parsing array field: ${field.field}`);
                        const {array, endLine} = parseArray(lines, currentLine1, position + 1);
                        obj = updateObject(obj, field.name, array);
                        currentLine1 = endLine;
                        break;
                    }
                }
            }
        });
        if (startLine === currentLine1) {
            currentLine1++;
        }
    }
    return {obj: {[objectName]: obj}, endLine: currentLine1};
}