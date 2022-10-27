import { readFile } from "fs/promises";
import { podFields } from "../constants/podFields";

import { parseObject } from "./parseObject";
import { processField } from "./processField";
import isEmpty from "lodash.isempty";
import invariant from "tiny-invariant";
import { Pod } from "../models/types";

export async function parseDescribePodFile(filePath: string): Promise<any> {
  console.info(`Parsing file ${filePath}`);
  const fileContents = await readFile(filePath, "utf8");
  const lines = fileContents.split(/\r?\n/);
  console.info(`Parsing file with ${lines.length} lines`);
  let currentLine = 0;
  let pod: Pod = {};
  while (currentLine < lines.length) {
    const startLine = currentLine;
    podFields.forEach((field) => {
      const { obj, endLine } = processField({ lines, field, currentLine });
      if (!isEmpty(obj)) {
        pod = { ...pod, ...obj };
        console.info(
          `Parsed field ${field.name} with value ${JSON.stringify(obj)}`
        );
        console.info(`Current pod: ${JSON.stringify(pod)}`);
      }
      currentLine = endLine;
    });
    if (startLine === currentLine) {
      currentLine++;
    }
  }
  invariant(pod, "Pod is required");
  console.info(`Parsed pod: ${JSON.stringify(pod)}`);
  invariant(pod.name, "Pod name is required");
  const podName = pod["name"];
  return { pod, podName };
}
