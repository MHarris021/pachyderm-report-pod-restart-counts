import {DescribeFields, DescribeFieldType} from "./types";
import {volumeFields} from "./volumeFields";
import {containerFields} from "./containerFields";

export enum PodFields {
    name = "Name:",
    podNamespace = "Namespace:",
    status = "Status:",
    startTime = "Start Time:",
    labels = "Labels:",
    annotations = "Annotations:",
    ip = "IP:",
    ips = "IPs:",
    node = "Node:",
    priority = "Priority:",
    controlledBy = "Controlled By:",
    conditions ="Conditions:",
    events = "Events:",
    containers = "Containers:",
    volumes = "Volumes:",
    initContainers = "Init Containers:",
    qoSClass = "QoS Class:",
    nodeSelectors = "Node-Selectors:",
    tolerations = "Tolerations:",
}


export const podFields:DescribeFields = [
    {
        name : "name",
        field : PodFields.name,
        fieldType : DescribeFieldType.Value,
    },
    {
        name : "namespace",
        field: PodFields.podNamespace,
        fieldType : DescribeFieldType.Value,
    },
    {
        name: "status",
        field: PodFields.status,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "startTime",
        field:  PodFields.startTime,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "labels",
        field: PodFields.labels,
        fieldType: DescribeFieldType.Array,
    },
    {
        name: "annotations",
        field: PodFields.annotations,
        fieldType: DescribeFieldType.Array,
    },
    {
        name: "containers",
        field: PodFields.containers,
        fieldType: DescribeFieldType.ObjectArray,
        subFields: containerFields
    },
    {
        name: "volumes",
        field: PodFields.volumes,
        fieldType: DescribeFieldType.ObjectArray,
        subFields: volumeFields,
    },
    {
        name: "node",
        field: PodFields.node,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "ip",
        field: PodFields.ip,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "priority",
        field: PodFields.priority,
        fieldType: DescribeFieldType.Value,
    },

    {
        name: "qoSClass",
        field: PodFields.qoSClass,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "controlledBy",
        field: PodFields.controlledBy,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "conditions",
        field: PodFields.conditions,
        fieldType: DescribeFieldType.Array,
    },
    {
        name: "initContainers",
        field: PodFields.initContainers,
        fieldType: DescribeFieldType.ObjectArray,
        subFields: containerFields,
    },
    {
        name: "events",
        field: PodFields.events,
        fieldType: DescribeFieldType.Array,
    },
    {
    name: "nodeSelectors",
        field: PodFields.nodeSelectors,
        fieldType: DescribeFieldType.Array,
    },
    {
        name: "tolerations",
        field: PodFields.tolerations,
        fieldType: DescribeFieldType.Array,
    },
    {
        name: "ips",
        field: PodFields.ips,
        fieldType: DescribeFieldType.Array,
    }
];

export const podValueFields = podFields.filter(field => field.fieldType === DescribeFieldType.Value).map(field => field.field);

export const podArrayFields = podFields.filter(field => field.fieldType === DescribeFieldType.Array).map(field => field.field);

export const podObjectFields = podFields.filter(field => field.fieldType === DescribeFieldType.Object).map(field => field.field);