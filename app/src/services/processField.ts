import {DescribeField, DescribeFieldType} from "../constants/types";
import startsWith from "lodash.startswith";
import {parseValue} from "./parseValue";
import {updateObject} from "./updateObject";
import {parseObjects} from "./parseObjects";
import {parseArray} from "./parseArray";
import invariant from "tiny-invariant";
import {parseObject} from "./parseObject";

export type ProcessFieldParams = {
    lines: string[];
    field: DescribeField;
    currentLine: number;
    position?: number;
    objectName?: string;
}

export function processField(params:ProcessFieldParams): { obj: object, endLine: number } {
    const {lines, field, currentLine, position, objectName} = params;
    console.info(`Processing field [${field.name}] at line ${currentLine} with value ${lines[currentLine]}`);
    let obj: object = {};
    if (objectName) {
        obj = updateObject(obj, "name", objectName);
    }
    let currentPosition = position || 0;
    let currentLine1 = currentLine;
    const line = lines[currentLine1]?.trim();
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
            case DescribeFieldType.ObjectArray: {
                console.info(`Parsing object array field: ${field.field}`);
                invariant(field.subFields, "Subfields are required for object array");
                const {objectArray, objectArrayKey, endLine} = parseObjects({lines, field, currentLine:currentLine1, position: currentPosition + 1});
                obj = updateObject(obj, objectArrayKey, objectArray);
                currentLine1 = endLine;
                break;
            }
            default: {
                console.error(`Field type "${field?.fieldType}" not found`);
                currentLine1++;
                break;
            }
        }
    }
    return {obj, endLine: currentLine1};
}