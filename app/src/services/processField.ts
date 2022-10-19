import {DescribeField, DescribeFieldType} from "../constants/types";
import startsWith from "lodash.startswith";
import {parseValue} from "./parseValue";
import {updateObject} from "./updateObject";
import {parseObjects} from "./parseObjects";
import {parseArray} from "./parseArray";

export function processField(line: string, field: DescribeField, obj: object, currentLine: number, lines: string[], position: number = 1): { newObj: object, endLine: number } {


    return {newObj: obj, endLine: currentLine};
}