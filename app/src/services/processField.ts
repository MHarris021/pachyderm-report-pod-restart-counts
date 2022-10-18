import {DescribeField, DescribeFieldType} from "../constants/types";
import startsWith from "lodash.startswith";
import {parseValue} from "./parseValue";
import {updateObject} from "./updateObject";
import {parseObjects} from "./parseObjects";
import {parseArray} from "./parseArray";

export function processField(line: string, field: DescribeField, obj: object, currentLine: number, lines: string[], position: number = 1): { newObj: object, endLine: number } {
    if (startsWith(line, field.field)) {
        switch (field.fieldType) {
            case DescribeFieldType.Value: {
                const {key, value} = parseValue(line);
                obj = updateObject(obj, key, value);
                currentLine++;
                break;
            }
            case DescribeFieldType.Object: {
                const {objects, endLine} = parseObjects(lines, field, currentLine, position + 2);
                obj = updateObject(obj, field.name, objects);
                currentLine = endLine;
                break;
            }
            case DescribeFieldType.Array: {
                const {array, endLine} = parseArray(lines, currentLine, position + 2);
                obj = updateObject(obj, field.name, array);
                currentLine = endLine;
                break;
            }
        }
    }
    return {newObj: obj, endLine: currentLine};
}