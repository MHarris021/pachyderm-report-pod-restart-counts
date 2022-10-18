import {DescribeFields, DescribeFieldType} from "./types";

export enum StateFields {
    started = "Started:",
    finished = "Finished:",
    reason = "Reason:",
    exitCode = "Exit Code:",
}

export const stateFields: DescribeFields = [
    {
        name: "started",
        field: StateFields.started,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "finished",
        field: StateFields.finished,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "reason",
        field: StateFields.reason,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "exitCode",
        field: StateFields.exitCode,
        fieldType: DescribeFieldType.Value,
    }
]