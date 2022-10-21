import {DescribeFields, DescribeFieldType} from "./types";
import {stateFields} from "./stateFields";

export enum ContainerFields {
    id = "Container ID:",
    image = "Image:",
    imageId = "Image ID:",
    ports = "Ports:",
    hostPorts = "Host Ports:",
    command = "Command:",
    args = "Args:",
    state = "State:",
    lastState = "Last State:",
    restartCount = "Restart Count:",
    ready = "Ready:",
    requests = "Requests:",
    liveness = "Liveness:",
    readiness = "Readiness:",
    startup = "Startup:",
    environment = "Environment:",
    environmentVariablesFrom = "Environment Variables from:",
    mounts = "Mounts:",
}

export const containerFields: DescribeFields = [
    {
        name: "id",
        field: ContainerFields.id,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "image",
        field: ContainerFields.image,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "imageId",
        field: ContainerFields.imageId,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "ports",
        field: ContainerFields.ports,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "hostPorts",
        field: ContainerFields.hostPorts,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "command",
        field: ContainerFields.command,
        fieldType: DescribeFieldType.Array,
    },
    {
        name: "args",
        field: ContainerFields.args,
        fieldType: DescribeFieldType.Array,
    },
    {
        name: "state",
        field: ContainerFields.state,
        fieldType: DescribeFieldType.Array,
    },
    {
        name: "lastState",
        field: ContainerFields.lastState,
        fieldType: DescribeFieldType.Array,
    },
    {
        name: "restartCount",
        field: ContainerFields.restartCount,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "ready",
        field: ContainerFields.ready,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "liveness",
        field: ContainerFields.liveness,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "readiness",
        field: ContainerFields.readiness,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "startup",
        field: ContainerFields.startup,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "environment",
        field: ContainerFields.environment,
        fieldType: DescribeFieldType.Array,
    },
    {
        name: "environmentVariablesFrom",
        field: ContainerFields.environmentVariablesFrom,
        fieldType: DescribeFieldType.Array,
    },
    {
        name: "mounts",
        field: ContainerFields.mounts,
        fieldType: DescribeFieldType.Array,
    },
    {
        name: "requests",
        field: ContainerFields.requests,
        fieldType: DescribeFieldType.Array,
    }
    ];

export const containerValueFields = containerFields.filter((field) => field.fieldType === DescribeFieldType.Value);
export const containerObjectFields = containerFields.filter((field) => field.fieldType === DescribeFieldType.Object);
export const containerArrayFields = containerFields.filter((field) => field.fieldType === DescribeFieldType.Array);