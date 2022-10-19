import {parseValue} from "./parseValue";
import startsWith from "lodash.startswith";
import {updateObject} from "./updateObject";
import {DescribeFields, DescribeFieldType} from "../constants/types";
import {parseArray} from "./parseArray";
import invariant from "tiny-invariant";

export type ParseObjectParams = {
    lines: string[];
    fields: DescribeFields;
    currentLine: number;
    position?: number;
    objectName?: string;
}

export function parseObject(params:ParseObjectParams): {obj: object, endLine: number} {
    const {lines, fields, currentLine, position, objectName} = params;
    let obj: object = {};
    if (objectName) {
        obj = updateObject(obj, "name", objectName);
    }
    let currentPosition = position || 1;
    let currentLine1 = currentLine;
    while (startsWith(lines[currentLine1], " ", currentPosition)) {
        const startLine = currentLine1;
        const line = lines[currentLine1].trim();
        console.info(`Parsing object line: ${line}`);
        fields.forEach(field => {
            if(startsWith(line, field.field)) {
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
                        const {array, endLine} = parseArray({lines, currentLine:currentLine1,position: currentPosition + 1});
                        obj = updateObject(obj, field.name, array);
                        currentLine1 = endLine;
                        break;
                    }
                    case DescribeFieldType.Object: {
                        console.info(`Parsing object field: ${field.field}`);
                        invariant(field.subFields, "Subfields are required for object");
                        const {obj: object, endLine} = parseObject({lines, fields: field.subFields, currentLine:currentLine1+1, position: currentPosition + 1});
                        obj = updateObject(obj, field.name, object);
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
    return {obj, endLine: currentLine1};
}