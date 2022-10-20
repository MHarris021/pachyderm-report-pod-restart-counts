import {DescribeFields, DescribeFieldType} from "./types";

export enum VolumeFields {
    volumeType = "Type:",
    claimName = "ClaimName:",
    readOnly = "ReadOnly:",
    tokenExpirationSeconds = "TokenExpirationSeconds:",
    configMapName = "ConfigMapName:",
    configMapOptional = "ConfigMapOptional:",
    downwardAPI = "DownwardAPI:",
    optional = "Optional:",
}

export const volumeFields:DescribeFields = [
    {
        name : "type",
        field : VolumeFields.volumeType,
        fieldType : DescribeFieldType.Value,
    },
    {
        name : "claimName",
        field: VolumeFields.claimName,
        fieldType : DescribeFieldType.Value,
    },
    {
        name: "readOnly",
        field: VolumeFields.readOnly,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "tokenExpirationSeconds",
        field:  VolumeFields.tokenExpirationSeconds,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "configMapName",
        field: VolumeFields.configMapName,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "configMapOptional",
        field: VolumeFields.configMapOptional,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "downwardAPI",
        field: VolumeFields.downwardAPI,
        fieldType: DescribeFieldType.Value,
    },
    {
        name: "optional",
        field: VolumeFields.optional,
        fieldType: DescribeFieldType.Value,
    }
]

export const volumeValueFields = volumeFields.filter((field) => field.fieldType === DescribeFieldType.Value);
export const volumeArrayFields = volumeFields.filter((field) => field.fieldType === DescribeFieldType.Array);
export const volumeObjectFields = volumeFields.filter((field) => field.fieldType === DescribeFieldType.Object);