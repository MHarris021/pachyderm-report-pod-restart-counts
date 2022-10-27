import { podFields } from "../constants/podFields";
import { processField } from "./processField";
import { Pod } from "../models/types";
import isEmpty from "lodash.isempty";

function processLines(
  currentLine: number,
  lines: string[],
  pod: Pod
): { currentLine: number; pod: Pod } {
  while (currentLine < lines.length) {
    const startLine = currentLine;
    podFields.forEach((field) => {
      const { obj, endLine } = processField({ lines, field, currentLine });
      if (!isEmpty(obj)) {
        pod = { ...pod, ...obj };
        console.info(
          `Parsed field ${field.name} with value ${JSON.stringify(
            obj
          )} starting at line ${currentLine} and ending at line ${endLine}`
        );
        console.info(`Current pod: ${JSON.stringify(pod)}`);
      }
      currentLine = endLine;
    });
    if (startLine === currentLine) {
      currentLine++;
    }
  }
  return { currentLine, pod };
}

describe("processField", () => {
  let pod: Pod = {};
  let currentLine = 0;

  beforeEach(function () {
    jest.resetModules();
    pod = {};
    currentLine = 0;
  });

  // given the correct lines and field the correct values and endLine should be returned
  it("should return the correct value and endLine", () => {
    const lines = [
      "Name:         my-pod",
      "Namespace:    default",
      "Priority:     0",
      "Node:         minikube",
    ];
    const output = processLines(currentLine, lines, pod);
    currentLine = output.currentLine;
    pod = output.pod;
    expect(currentLine).toEqual(4);
    expect(pod).toEqual({
      name: "my-pod",
      namespace: "default",
      priority: "0",
      node: "minikube",
    });
  });

  // given the correct lines and field the correct arrays, values, and endLine should be returned
  it("should return the correct arrays, values, and endLine", () => {
    const lines = [
      "Name:         my-pod",
      "Namespace:    default",
      "Priority:     0",
      "Node:         minikube",
      "Labels:       app=my-app",
      "              tier=frontend",
      "Annotations:  kubernetes.io/psp: eks.privileged",
      "Status:       Running",
      "IP:  10.2.25.10",
      "IPs:",
      "  IP: 10.2.25.10",
      "Controlled By:  ReplicaSet/my-pod-5b8b9f4f7f",
    ];
    const output = processLines(currentLine, lines, pod);
    currentLine = output.currentLine;
    pod = output.pod;
    expect(currentLine).toEqual(12);
    expect(pod).toEqual({
      name: "my-pod",
      namespace: "default",
      priority: "0",
      node: "minikube",
      labels: ["app=my-app", "tier=frontend"],
      annotations: ["kubernetes.io/psp: eks.privileged"],
      status: "Running",
      ip: "10.2.25.10",
      ips: ["IP: 10.2.25.10"],
      controlledBy: "ReplicaSet/my-pod-5b8b9f4f7f",
    });
  });

  // given the correct lines and field the correct objects, values, and endLine should be returned
  it("should return the correct objects, values, and endLine", () => {
    const lines = [
      "Name:         my-pod",
      "Namespace:    default",
      "Priority:     0",
      "Node:         minikube",
      "Status:       Running",
      "QoS Class:       Guaranteed",
      "Volumes:",
      "  my-volume:",
      "    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)",
      "    ClaimName:  my-pvc",
      "    ReadOnly:   false",
      "  my-volume-2:",
      "    Type:       ConfigMap (a volume populated by a ConfigMap)",
      "    Optional:   false",
      "Start Time:     Wed, 10 Jun 2020 15:00:00 -0400",
    ];
    const output = processLines(currentLine, lines, pod);
    currentLine = output.currentLine;
    pod = output.pod;
    expect(currentLine).toEqual(15);
    expect(pod).toEqual({
      name: "my-pod",
      namespace: "default",
      priority: "0",
      node: "minikube",
      qoSClass: "Guaranteed",
      status: "Running",
      volumes: [
        {
          name: "my-volume",
          type: "PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)",
          claimName: "my-pvc",
          readOnly: "false",
        },
        {
          name: "my-volume-2",
          type: "ConfigMap (a volume populated by a ConfigMap)",
          optional: "false",
        },
      ],
      startTime: "Wed, 10 Jun 2020 15:00:00 -0400",
    });
  });

  // given the following lines the pod should have a name, 1 volume, and a qoSClass
  it("should have a name, 1 volumes, and a qoSClass", () => {
    const lines = [
      "Name:         my-pod",
      "Volumes:",
      "  my-volume:",
      "    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)",
      "    ClaimName:  my-pvc",
      "    ReadOnly:   false",
      "QoS Class:       Guaranteed",
    ];
    const output = processLines(currentLine, lines, pod);
    currentLine = output.currentLine;
    pod = output.pod;
    expect(currentLine).toEqual(7);
    expect(pod).toEqual({
      name: "my-pod",
      qoSClass: "Guaranteed",
      volumes: [
        {
          name: "my-volume",
          type: "PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)",
          claimName: "my-pvc",
          readOnly: "false",
        },
      ],
    });
  });

  // given the following lines the pod should have a name, 1 container, and a qoSClass
  it("should have a name, 1 container, and a qoSClass", () => {
    const lines = [
      "Name:         my-pod",
      "Containers:",
      "  my-container:",
      "    Image:       my-image",
      "    Ports:        8080/TCP",
      "QoS Class:       Guaranteed",
    ];
    const output = processLines(currentLine, lines, pod);
    currentLine = output.currentLine;
    pod = output.pod;
    expect(currentLine).toEqual(6);
    expect(pod).toEqual({
      name: "my-pod",
      qoSClass: "Guaranteed",
      containers: [
        {
          name: "my-container",
          image: "my-image",
          ports: "8080/TCP",
        },
      ],
    });
  });
});
