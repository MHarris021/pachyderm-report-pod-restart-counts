import startsWith from "lodash.startswith";
import { updateObject } from "./updateObject";
import { DescribeFields } from "../constants/types";
import isEmpty from "lodash.isempty";
import { processField } from "./processField";
import invariant from "tiny-invariant";

export interface ParseObjectParams {
  lines: string[];
  fields: DescribeFields;
  currentLine: number;
  position?: number;
  objectName?: string;
}

export function parseObject(params: ParseObjectParams): {
  obj: object;
  endLine: number;
} {
  const { lines, fields, currentLine, position, objectName } = params;
  let o: object = {};
  const currentPosition = position ?? 1;
  let currentLine1 = currentLine ?? 0;
  if (!isEmpty(objectName)) {
    invariant(objectName, "Object name is required");
    o = updateObject(o, "name", objectName);
    currentLine1++;
  }
  while (
    currentLine1 < lines.length &&
    startsWith(lines[currentLine1], " ", currentPosition)
  ) {
    const startLine = currentLine1;
    const line = lines[currentLine1].trim();
    console.info(`Parsing object line: ${line}`);
    fields.forEach((field) => {
      const { obj, endLine } = processField({
        lines,
        field,
        currentLine: currentLine1,
        position: currentPosition,
      });
      if (!isEmpty(obj)) {
        o = { ...o, ...obj };
      }
      currentLine1 = endLine;
    });
    if (startLine === currentLine1) {
      break;
    }
  }
  return { obj: o, endLine: currentLine1 };
}
