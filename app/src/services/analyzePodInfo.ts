import toNumber from "lodash.tonumber";
import { PodInfo } from "../models";
import { getProperty } from "./getProperty";

export async function analyzePodInfo(filePath: string): Promise<PodInfo> {
  const podName = await getProperty(filePath, "Name:");
  const podNamespace = await getProperty(filePath, "Namespace:");
  const podStatus = await getProperty(filePath, "Status:");
  const podStartTime = await getProperty(filePath, "Start Time:");
  const podIP = await getProperty(filePath, "IP:");
  const podNode = await getProperty(filePath, "Node:");
  const podPriority = toNumber(await getProperty(filePath, "Priority:"));
  const podControlledBy = await getProperty(filePath, "Controlled By:");
  return new PodInfo({
    podName,
    podNamespace,
    podStatus,
    podStartTime,
    podIP,
    podNode,
    podPriority,
    podControlledBy,
  });
}
